'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  Language,
  Translations,
  translations,
  germanHeroSlides,
  germanServices,
  germanProjects,
  germanTeamMembers,
  germanTestimonials,
  germanBlogs,
} from '../data/translations';
import { ServiceDetail, Project, TeamMember, Testimonial, BlogPost, HeroSlide } from '../types';

export type { Language, Translations };

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
  localizeService: (service: ServiceDetail) => ServiceDetail;
  localizeProject: (project: Project) => Project;
  localizeTeamMember: (member: TeamMember) => TeamMember;
  localizeTestimonial: (test: Testimonial) => Testimonial;
  localizeBlog: (blog: BlogPost) => BlogPost;
  localizeHeroSlide: (slide: HeroSlide, index: number) => HeroSlide;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('en');

  // Load language preference from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('webdev_lang') as Language;
      if (saved === 'en' || saved === 'de') {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('webdev_lang', newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'de' : 'en');
  }, [lang, setLang]);

  // Localization Helpers
  const localizeService = useCallback((service: ServiceDetail): ServiceDetail => {
    if (lang !== 'de') return service;
    const deData = germanServices[service.id];
    if (!deData) return service;
    return {
      ...service,
      ...deData,
      title: deData.title || service.title,
      shortDesc: deData.shortDesc || service.shortDesc,
      fullDesc: deData.fullDesc || service.fullDesc,
      features: deData.features || service.features,
      deliverables: deData.deliverables || service.deliverables,
    };
  }, [lang]);

  const localizeProject = useCallback((project: Project): Project => {
    if (lang !== 'de') return project;
    const deData = germanProjects[project.id];
    if (!deData) return project;
    return {
      ...project,
      ...deData,
      title: deData.title || project.title,
      category: deData.category || project.category,
      description: deData.description || project.description,
      features: deData.features || project.features,
      metrics: deData.metrics || project.metrics,
      highlight: deData.highlight || project.highlight,
    };
  }, [lang]);

  const localizeTeamMember = useCallback((member: TeamMember): TeamMember => {
    if (lang !== 'de') return member;
    const deData = germanTeamMembers[member.id];
    if (!deData) return member;
    return {
      ...member,
      ...deData,
      role: deData.role || member.role,
      headline: deData.headline || member.headline,
      bio: deData.bio || member.bio,
      location: deData.location || member.location,
    };
  }, [lang]);

  const localizeTestimonial = useCallback((test: Testimonial): Testimonial => {
    if (lang !== 'de') return test;
    const deData = germanTestimonials[test.id];
    if (!deData) return test;
    return {
      ...test,
      ...deData,
      quote: deData.quote || test.quote,
      role: deData.role || test.role,
    };
  }, [lang]);

  const localizeBlog = useCallback((blog: BlogPost): BlogPost => {
    if (lang !== 'de') return blog;
    const deData = germanBlogs[blog.id];
    if (!deData) return blog;
    return {
      ...blog,
      ...deData,
      title: deData.title || blog.title,
      excerpt: deData.excerpt || blog.excerpt,
      readTime: deData.readTime || blog.readTime,
    };
  }, [lang]);

  const localizeHeroSlide = useCallback((slide: HeroSlide, index: number): HeroSlide => {
    if (lang !== 'de') return slide;
    const deData = germanHeroSlides[index];
    if (!deData) return slide;
    return {
      ...slide,
      ...deData,
      badge: deData.badge || slide.badge,
      title: deData.title || slide.title,
      highlightText: deData.highlightText || slide.highlightText,
      subtitle: deData.subtitle || slide.subtitle,
      primaryBtnText: deData.primaryBtnText || slide.primaryBtnText,
      secondaryBtnText: deData.secondaryBtnText || slide.secondaryBtnText,
    };
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    toggleLang,
    t: translations[lang] || translations.en,
    localizeService,
    localizeProject,
    localizeTeamMember,
    localizeTestimonial,
    localizeBlog,
    localizeHeroSlide,
  }), [
    lang,
    setLang,
    toggleLang,
    localizeService,
    localizeProject,
    localizeTeamMember,
    localizeTestimonial,
    localizeBlog,
    localizeHeroSlide,
  ]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: 'en',
      setLang: () => {},
      toggleLang: () => {},
      t: translations.en,
      localizeService: (s) => s,
      localizeProject: (p) => p,
      localizeTeamMember: (m) => m,
      localizeTestimonial: (t) => t,
      localizeBlog: (b) => b,
      localizeHeroSlide: (s) => s,
    };
  }
  return context;
};
