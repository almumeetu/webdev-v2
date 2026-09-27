import React from 'react';
import { ArrowLeft, FileText, Scale, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TermsOfServicePageProps {
  content: string;
  onBack: () => void;
}

const GERMAN_TERMS_OF_SERVICE = `# Allgemeine Geschäftsbedingungen (AGB)

Diese Allgemeinen Geschäftsbedingungen („AGB“) regeln die vertraglichen Beziehungen zwischen der WebDev Software Solutions und ihren gewerblichen Kunden.

## 1. Geltungsbereich und Vertragsgegenstand
WebDev Software Solutions erbringt professionelle Dienstleistungen in den Bereichen Full-Stack-Webentwicklung, Cloud- und DevOps-Architektur, E-Commerce-Systeme (Shopify Plus, WooCommerce) sowie Enterprise-Individualsoftware. Der genaue Leistungsumfang wird jeweils im projektspezifischen Angebot oder Statement of Work (SOW) verbindlich vereinbart.

## 2. Urheberrechte und Quellcode-Eigentum
Mit der vollständigen Bezahlung der vereinbarten Projektvergütung erwirbt der Kunde das uneingeschränkte, ausschließliche und zeitlich unbegrenzte Nutzungs- und Verwertungsrecht an dem für ihn individuell entwickelten Quellcode, den Datenbankstrukturen und UI-Komponenten (100% Client Code Ownership).

## 3. Geheimhaltung und Datenschutz (NDA)
Beide Parteien verpflichten sich zur strengsten Geheimhaltung aller im Rahmen des Projekts ausgetauschten Betriebs- und Geschäftsgeheimnisse sowie technischer Spezifikationen. Auf Kundenwunsch unterzeichnen wir vor Projektbeginn bilaterale Non-Disclosure Agreements (NDAs).

## 4. Zahlungskonditionen & Festpreise
Die Abrechnung erfolgt transparent anhand vertraglich definierter Meilensteine. Rechnungsbeträge sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zur Zahlung fällig.

## 5. Abnahme & 30-Tage-Garantie
Nach Produktivbereitstellung gewährt WebDev Software Solutions eine 30-tägige kostenfreie Qualitätsgarantie zur Beseitigung unvorhergesehener technischer Mängel. Kontinuierlicher Support kann über individuelle Service Level Agreements (SLAs) vereinbart werden.

## 6. Anwendbares Recht & Gerichtsstand
Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG). Gerichtsstand für alle Streitigkeiten ist Leverkusen / Köln, Deutschland.

*Stand: Januar 2026*`;

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ content, onBack }) => {
  const { lang } = useLanguage();
  const displayContent = lang === 'de' ? GERMAN_TERMS_OF_SERVICE : (content || '');

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 font-semibold mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] rounded-2xl flex items-center justify-center shadow-sm">
              <Scale className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Archivo']">
                {lang === 'de' ? 'Allgemeine Geschäftsbedingungen (AGB)' : 'Terms of Service'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {lang === 'de' ? 'Rechtliche Rahmenbedingungen für die Zusammenarbeit und Nutzung unserer Services' : 'Legal agreement governing your use of our services'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1.5 bg-[#BBE7F1] text-slate-950 px-3 py-1.5 rounded-full border border-[#9cd5e2] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {lang === 'de' ? 'Verbindliche Vereinbarung' : 'Binding Agreement'}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              {lang === 'de' ? 'Rechtlich verbindlich' : 'Please Read Carefully'}
            </span>
            <span className="text-slate-500">{lang === 'de' ? 'Stand: Januar 2026' : 'Last updated: January 2026'}</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm">
          <div className="prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-slate-700">
              {displayContent || (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p className="text-slate-500">
                    {lang === 'de' ? 'Allgemeine Geschäftsbedingungen nicht verfügbar' : 'Terms of service content not available'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            {lang === 'de' ? 'Für vertragliche oder rechtliche Rückfragen kontaktieren Sie uns unter ' : 'For legal questions or contract inquiries, contact us at '}
            <a href="mailto:info@webdevsoftwaresolutions.com" className="text-cyan-800 hover:text-cyan-900 font-semibold">
              info@webdevsoftwaresolutions.com
            </a>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
