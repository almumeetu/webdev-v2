import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PrivacyPolicyPageProps {
  content: string;
  onBack: () => void;
}

const GERMAN_PRIVACY_POLICY = `# Datenschutzerklärung (DSGVO)

**WebDev Software Solutions** („wir“, „unsere“ oder „uns“) verpflichtet sich dem Schutz Ihrer personenbezogenen Daten gemäß der EU-Datenschutz-Grundverordnung (DSGVO) sowie den anwendbaren nationalen Datenschutzgesetzen.

## 1. Verantwortlicher
WebDev Software Solutions
Küppersteg, 51373 Leverkusen, Deutschland
E-Mail: info@webdevsoftwaresolutions.com
Telefon: +49 172 9766016

## 2. Erhebung und Speicherung personenbezogener Daten
Wenn Sie uns über unsere Kontaktformulare, Projekt-Bestellformulare oder per E-Mail kontaktieren, erheben wir folgende Daten:
- Vollständiger Name
- Geschäftliche E-Mail-Adresse
- Telefonnummer / WhatsApp-Kontakt
- Unternehmensname und Projektanforderungen / Budgetrahmen
- Technische Serverprotokolle (IP-Adresse, Browsertyp, Zugriffszeiten) zur Gewährleistung der IT-Systemsicherheit.

## 3. Zweck und Rechtsgrundlage der Datenverarbeitung
Die Verarbeitung Ihrer Daten erfolgt zur Bearbeitung Ihrer Anfrage, zur Erstellung von Architekturentwürfen und Festpreisangeboten (Art. 6 Abs. 1 lit. b DSGVO) sowie auf Basis unseres berechtigten Interesses an der fehlerfreien Bereitstellung unserer Webservices (Art. 6 Abs. 1 lit. f DSGVO).

## 4. Speicherdauer
Wir speichern Ihre Daten nur so lange, wie es zur Abwicklung Ihrer Projektanfrage oder aufgrund gesetzlicher handels- und steuerrechtlicher Aufbewahrungspflichten erforderlich ist. Nach Ablauf der Fristen werden die Daten routinemäßig und datenschutzkonform gelöscht.

## 5. Ihre Rechte als betroffene Person
Gemäß DSGVO haben Sie folgende Rechte:
- Recht auf Auskunft über Ihre von uns verarbeiteten Daten (Art. 15 DSGVO)
- Recht auf unverzügliche Berichtigung unrichtiger Daten (Art. 16 DSGVO)
- Recht auf Löschung („Recht auf Vergessenwerden“, Art. 17 DSGVO)
- Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)
- Recht auf Datenübertragbarkeit (Art. 20 DSGVO)
- Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)

Um Ihre Rechte auszuüben, genügt eine formlose E-Mail an **info@webdevsoftwaresolutions.com**.

## 6. Technische Datensicherheit & Verschlüsselung
Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine durchgehende 256-Bit-SSL/TLS-Verschlüsselung.

## 7. Cookies
Unsere Website setzt ausschließlich technisch essenzielle Session-Cookies ein. Wir verwenden keine zustimmungspflichtigen Tracking-, Werbe- oder Marketing-Cookies von Drittanbietern.

*Stand: Januar 2026*`;

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ content, onBack }) => {
  const { lang } = useLanguage();
  const displayContent = lang === 'de' ? (GERMAN_PRIVACY_POLICY) : (content || '');

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
              <Shield className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Archivo']">
                {lang === 'de' ? 'Datenschutzerklärung (DSGVO)' : 'Privacy Policy'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {lang === 'de' ? 'Wie wir Ihre personenbezogenen Daten erheben, verarbeiten und schützen' : 'How we collect, use, and protect your personal data'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 font-semibold">
              <Lock className="w-3.5 h-3.5" />
              {lang === 'de' ? 'DSGVO-konform' : 'GDPR Compliant'}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#BBE7F1] text-slate-950 px-3 py-1.5 rounded-full border border-[#9cd5e2] font-semibold">
              <Eye className="w-3.5 h-3.5" />
              {lang === 'de' ? 'Transparente Datenverarbeitung' : 'Transparent Data Practices'}
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
                    {lang === 'de' ? 'Datenschutzerklärung nicht verfügbar' : 'Privacy policy content not available'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            {lang === 'de' ? 'Bei datenschutzrechtlichen Fragen kontaktieren Sie uns unter ' : 'For privacy-related questions, contact us at '}
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

export default PrivacyPolicyPage;
