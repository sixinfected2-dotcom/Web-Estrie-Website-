import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import {
  LegalSection,
  Ledger,
  LedgerRow,
} from "@/components/sections/legal/LegalSection";
import { LegalToc } from "@/components/sections/legal/LegalToc";
import {
  A,
  H3,
  P,
  Tech,
  UL,
} from "@/components/sections/legal/prose";
import { formatDate } from "@/lib/blogue";
import { site } from "@/lib/data";
import { privacyPath, privacyUpdatedAt } from "@/lib/privacy";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Les renseignements personnels que recueille webestrie.ca et l’outil interne Web Estrie CRM : finalités, fournisseurs, conservation, droits et données Google.",
  alternates: { canonical: privacyPath },
};

const toc = [
  { id: "responsable", title: "Qui est responsable" },
  { id: "recueil", title: "Ce que le site recueille" },
  { id: "finalites", title: "Pourquoi nous les utilisons" },
  { id: "fournisseurs", title: "Avec qui nous les communiquons" },
  { id: "conservation", title: "Combien de temps nous les gardons" },
  { id: "securite", title: "Sécurité" },
  { id: "temoins", title: "Témoins et stockage local" },
  { id: "droits", title: "Vos droits" },
  { id: "crm", title: "Web Estrie CRM et les données Google" },
  { id: "modifications", title: "Modifications de cette politique" },
];

const title = (id: string) => toc.find((t) => t.id === id)!.title;
const n = (id: string) => toc.findIndex((t) => t.id === id) + 1;

/**
 * Politique de confidentialité — Loi 25 (formulaire de contact) et
 * application OAuth Google « Web Estrie CRM ». Longue lecture : en-tête
 * calme, table des matières collante, une seule colonne de texte à 66ch.
 * Le texte ne décrit que ce que le code et les outils font réellement.
 */
export default function PrivacyPage() {
  return (
    <>
      <header className="pt-[72px]">
        <Container className="pb-12 pt-20 md:pb-16 md:pt-28">
          <Reveal y={0} delay={0.04}>
            <Eyebrow>Confidentialité</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 max-w-[22ch] font-serif text-[clamp(2.3rem,5.2vw,3.8rem)] font-[420] leading-[1.05] tracking-[-0.022em] text-ink">
              Politique de confidentialité<span className="text-accent">.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lead mt-7 max-w-[58ch] text-ink-soft">
              Cette politique explique ce que nous recueillons sur webestrie.ca,
              pourquoi, avec qui nous le communiquons, combien de temps nous le
              gardons et comment exercer vos droits. Elle couvre aussi Web
              Estrie CRM, notre outil interne.
            </p>
          </Reveal>
          <Reveal delay={0.3} y={10}>
            <p className="text-eyebrow mt-12 flex items-center gap-3 border-t border-hairline pt-5 text-ink-soft">
              <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
              Mise à jour le{" "}
              <time dateTime={privacyUpdatedAt}>
                {formatDate(privacyUpdatedAt)}
              </time>
            </p>
          </Reveal>
        </Container>
      </header>

      <Container className="pb-24 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 lg:pt-4">
          <aside className="lg:col-span-3">
            <LegalToc items={toc} />
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            {/* ——— 1 ——— */}
            <LegalSection id="responsable" index={n("responsable")} title={title("responsable")}>
              <P>
                Web Estrie est une agence web établie en Estrie, au Québec. Elle
                est responsable des renseignements personnels décrits dans cette
                politique.
              </P>
              <Ledger>
                <LedgerRow label="Entreprise">
                  <p>Web Estrie, Estrie (Québec)</p>
                </LedgerRow>
                <LedgerRow label="Responsable">
                  <p>
                    Felix Stebenne, propriétaire
                  </p>
                  <p className="text-[14.5px]">
                    Responsable de la protection des renseignements personnels
                  </p>
                </LedgerRow>
                <LedgerRow label="Courriel">
                  <p>
                    <A href={`mailto:${site.email}`}>{site.email}</A>
                  </p>
                </LedgerRow>
              </Ledger>
              <P>
                Pour toute question sur cette politique ou pour exercer vos
                droits, écrivez-nous à cette adresse.
              </P>
            </LegalSection>

            {/* ——— 2 ——— */}
            <LegalSection id="recueil" index={n("recueil")} title={title("recueil")}>
              <P>Le site recueille des renseignements de trois façons.</P>

              <H3>Le formulaire de contact</H3>
              <P>
                Quand vous nous écrivez par le formulaire de la page{" "}
                <A href="/contact">Contact</A>, nous recevons&nbsp;:
              </P>
              <UL>
                <li>votre nom;</li>
                <li>votre courriel;</li>
                <li>le type de projet que vous avez choisi;</li>
                <li>votre budget approximatif, si vous l’indiquez (facultatif);</li>
                <li>le contenu de votre message.</li>
              </UL>
              <P>
                Ces renseignements viennent de vous, et vous les fournissez
                volontairement. Dans le message, évitez d’inscrire ce dont nous
                n’avons pas besoin (numéro d’assurance sociale, renseignements
                bancaires ou de santé).
              </P>

              <H3>Les données techniques de connexion</H3>
              <P>
                Pour limiter les envois abusifs, le serveur du site garde
                temporairement en mémoire l’adresse IP des envois du formulaire
                (cinq par heure au maximum). Nous ne l’enregistrons pas dans nos
                dossiers. Le formulaire contient aussi un champ invisible qui
                sert uniquement à repérer les robots.
              </P>
              <P>
                Notre hébergeur, Vercel, traite lui aussi des données techniques
                de connexion (adresse IP, navigateur, appareil) pour livrer les
                pages et protéger le service, selon{" "}
                <A href="https://vercel.com/legal/privacy-policy">
                  sa propre politique de confidentialité
                </A>
                .
              </P>

              <H3>La mesure d’audience</H3>
              <P>
                Nous utilisons Vercel Web Analytics pour savoir quelles pages
                sont consultées. Selon Vercel, cet outil n’utilise aucun témoin
                et ne suit pas les personnes d’un site à l’autre. Il enregistre
                des visites de façon anonyme&nbsp;: page consultée, site de
                provenance, pays, région et ville approximatifs, système
                d’exploitation, navigateur et type d’appareil. Ces données ne
                servent qu’à produire des statistiques agrégées. Une empreinte
                technique, supprimée après 24 heures, permet de compter une
                visite sans vous identifier.
              </P>
            </LegalSection>

            {/* ——— 3 ——— */}
            <LegalSection id="finalites" index={n("finalites")} title={title("finalites")}>
              <P>Nous utilisons ces renseignements pour&nbsp;:</P>
              <UL>
                <li>répondre à votre demande et évaluer votre projet;</li>
                <li>
                  vous revenir avec un plan clair et, au besoin, une soumission;
                </li>
                <li>
                  si vous devenez client, gérer la relation d’affaires
                  (réalisation du projet, facturation, suivi);
                </li>
                <li>
                  assurer la sécurité du site et prévenir les envois abusifs;
                </li>
                <li>
                  mesurer la fréquentation du site, sous forme de statistiques
                  agrégées.
                </li>
              </UL>
              <P>
                Nous ne les utilisons pas à des fins de publicité, et nous ne les
                vendons ni ne les louons. Nous ne vous inscrivons à aucune
                infolettre sans votre accord. Les échanges qui suivent votre
                message peuvent être consignés dans notre outil de gestion
                interne (voir la section{" "}
                <A href="#crm">{`${n("crm")}. ${title("crm")}`}</A>).
              </P>

              <H3>Consentement</H3>
              <P>
                En envoyant le formulaire, vous consentez à ce que nous utilisions
                les renseignements fournis aux fins décrites ci-dessus. Vous
                pouvez retirer ce consentement en tout temps en nous écrivant;
                nous cesserons alors de les utiliser, sous réserve de nos
                obligations légales. Sans ces renseignements, nous ne pourrons
                toutefois pas donner suite à votre demande.
              </P>
            </LegalSection>

            {/* ——— 4 ——— */}
            <LegalSection id="fournisseurs" index={n("fournisseurs")} title={title("fournisseurs")}>
              <P>
                Vos renseignements ne sont communiqués qu’aux fournisseurs dont
                nous avons besoin pour faire fonctionner le site et recevoir vos
                messages. Chacun ne les traite que pour nous fournir son service.
              </P>
              <Ledger>
                <LedgerRow label="Vercel">
                  <p>
                    Hébergement du site, exécution du formulaire et mesure
                    d’audience.
                  </p>
                  <p>
                    <span className="font-medium text-ink">Renseignements&nbsp;:</span>{" "}
                    données techniques de connexion, contenu du formulaire au
                    moment de l’envoi, statistiques de pages.
                  </p>
                  <p>
                    <span className="font-medium text-ink">Lieu&nbsp;:</span>{" "}
                    États-Unis (infrastructure mondiale).
                  </p>
                </LedgerRow>
                <LedgerRow label="Resend">
                  <p>Envoi du courriel qui nous transmet votre message.</p>
                  <p>
                    <span className="font-medium text-ink">Renseignements&nbsp;:</span>{" "}
                    nom, courriel, type de projet, budget et message.
                  </p>
                  <p>
                    <span className="font-medium text-ink">Lieu&nbsp;:</span>{" "}
                    États-Unis.{" "}
                    <A href="https://resend.com/legal/privacy-policy">
                      Politique de Resend
                    </A>
                    .
                  </p>
                </LedgerRow>
                <LedgerRow label="Google (Gmail)">
                  <p>
                    Boîte de réception de l’agence, où nous recevons et gardons
                    nos courriels, y compris nos échanges avec vous.
                  </p>
                  <p>
                    <span className="font-medium text-ink">Renseignements&nbsp;:</span>{" "}
                    votre message et nos réponses.
                  </p>
                  <p>
                    <span className="font-medium text-ink">Lieu&nbsp;:</span>{" "}
                    États-Unis et autres pays où Google exploite ses centres de
                    données.
                  </p>
                </LedgerRow>
              </Ledger>

              <H3>Communication à l’extérieur du Québec</H3>
              <P>
                Ces fournisseurs peuvent traiter et conserver vos renseignements
                à l’extérieur du Québec, notamment aux États-Unis, où les règles
                de protection ne sont pas les mêmes qu’au Québec. Cette
                communication se limite à ce qui est nécessaire pour vous
                répondre. Nous ne communiquons pas vos renseignements à d’autres
                tiers, sauf si la loi l’exige.
              </P>
            </LegalSection>

            {/* ——— 5 ——— */}
            <LegalSection id="conservation" index={n("conservation")} title={title("conservation")}>
              <P>
                Nous gardons les messages reçus par le formulaire pendant 24 mois
                après notre dernier échange, puis nous les détruisons ou nous les
                anonymisons.
              </P>
              <P>
                Si vous devenez client, nous conservons les renseignements
                nécessaires à la relation d’affaires et à nos obligations légales
                (comptabilité, fiscalité) aussi longtemps qu’ils sont requis.
                Les échanges consignés dans notre outil de gestion suivent ces
                mêmes durées. Les statistiques d’audience sont agrégées et ne
                permettent pas de vous identifier.
              </P>
            </LegalSection>

            {/* ——— 6 ——— */}
            <LegalSection id="securite" index={n("securite")} title={title("securite")}>
              <P>Nous prenons des mesures raisonnables pour protéger vos renseignements&nbsp;:</P>
              <UL>
                <li>le site est servi par une connexion chiffrée (HTTPS);</li>
                <li>
                  le formulaire limite le nombre d’envois et filtre les robots,
                  sans vous demander de résoudre un test;
                </li>
                <li>
                  l’accès à la boîte de réception et aux dossiers clients est
                  réservé aux personnes de l’agence qui en ont besoin, et protégé
                  par authentification.
                </li>
              </UL>
              <P>
                En cas d’incident de confidentialité présentant un risque de
                préjudice sérieux, nous avisons la Commission d’accès à
                l’information du Québec et les personnes concernées.
              </P>
            </LegalSection>

            {/* ——— 7 ——— */}
            <LegalSection id="temoins" index={n("temoins")} title={title("temoins")}>
              <P>
                Le site ne dépose aucun témoin (cookie). Il n’utilise ni publicité
                comportementale, ni pixel de suivi, ni outil de profilage. Seule
                la mesure d’audience décrite plus haut établit, de façon agrégée,
                la provenance approximative des visites.
              </P>
              <P>
                Un seul élément est écrit dans votre navigateur&nbsp;: une
                mention de session qui indique que l’animation d’ouverture a déjà
                joué. Elle reste dans votre navigateur, n’est jamais transmise et
                disparaît à la fermeture de l’onglet.
              </P>
              <P>
                Les polices de caractères sont servies depuis notre propre
                domaine, sans appel à un service tiers. Le site contient des liens
                vers des sites externes (Instagram, sites de clients présentés
                dans nos réalisations), qui ont leur propre politique de
                confidentialité.
              </P>
            </LegalSection>

            {/* ——— 8 ——— */}
            <LegalSection id="droits" index={n("droits")} title={title("droits")}>
              <P>
                En écrivant au responsable de la protection des renseignements
                personnels, vous pouvez en tout temps&nbsp;:
              </P>
              <UL>
                <li>
                  savoir si nous détenons des renseignements sur vous et en
                  obtenir une copie, sur demande dans un format technologique
                  structuré et couramment utilisé (accès);
                </li>
                <li>
                  faire corriger des renseignements inexacts, incomplets ou
                  équivoques (rectification);
                </li>
                <li>retirer votre consentement à leur utilisation.</li>
              </UL>
              <P>
                Nous pouvons vous demander de confirmer votre identité avant de
                donner suite à une demande. Nous répondons par écrit dans les 30
                jours suivant sa réception.
              </P>
              <P>
                Si notre réponse ne vous convient pas, ou en l’absence de
                réponse, vous pouvez porter plainte auprès de la{" "}
                <A href="https://www.cai.gouv.qc.ca">
                  Commission d’accès à l’information du Québec
                </A>
                .
              </P>
            </LegalSection>

            {/* ——— 9 ——— */}
            <LegalSection id="crm" index={n("crm")} title={title("crm")}>
              <P>
                Web Estrie CRM est l’outil de gestion interne de l’agence. Il n’est
                offert ni au public ni à nos clients, on ne peut pas s’y
                inscrire, et seules les personnes autorisées de l’agence y ont
                accès.
              </P>

              <H3>Ce à quoi l’outil accède</H3>
              <P>
                L’outil se connecte, par l’API Gmail, au seul compte Gmail de
                l’agence. Aucun autre compte Google n’est connecté. Il demande
                quatre autorisations&nbsp;:
              </P>
              <UL>
                <li>
                  <Tech>gmail.readonly</Tech>&nbsp;: lire les courriels du compte
                  de l’agence (messages, fils de discussion, pièces jointes),
                  sans pouvoir les modifier ni les supprimer;
                </li>
                <li>
                  <Tech>gmail.send</Tech>&nbsp;: envoyer un courriel depuis ce
                  compte, uniquement lorsqu’une personne de l’agence le demande
                  dans l’outil;
                </li>
                <li>
                  <Tech>openid</Tech> et <Tech>userinfo.email</Tech>&nbsp;:
                  confirmer l’adresse du compte Google connecté.
                </li>
              </UL>

              <H3>Ce que nous en faisons</H3>
              <P>
                L’outil consigne dans la fiche d’un client ou d’un prospect les
                échanges de courriel avec l’agence, pour suivre chaque dossier
                (qui a écrit, à quelle date, quelle réponse est attendue). Il ne
                synchronise que les échanges liés à des clients ou à des
                prospects de l’agence, et n’envoie jamais de courriel de
                lui-même.
              </P>

              <H3>Où sont les données</H3>
              <P>
                Les données sont stockées sur un serveur de l’agence situé au
                Québec. L’accès à l’outil est acheminé par le réseau de
                Cloudflare, qui assure la protection et la livraison du trafic.
                Des copies de sauvegarde sont conservées hors du serveur, chez
                Cloudflare (stockage R2), dans un centre de données nord-américain
                qui peut se trouver hors du Québec. Elles sont chiffrées avant
                leur envoi : Cloudflare ne peut pas lire leur contenu.
              </P>

              <H3>Ce que nous ne faisons pas</H3>
              <P>
                Les données Google ne sont jamais vendues, louées ni partagées
                avec des tiers. Elles ne servent ni à la publicité, ni au ciblage,
                ni au profilage. Personne en dehors de l’agence ne lit ces
                courriels, sauf si la loi nous y oblige.
              </P>

              <H3>Retirer l’accès</H3>
              <P>
                L’accès de l’outil au compte Gmail peut être révoqué à tout
                moment depuis les{" "}
                <A href="https://myaccount.google.com/permissions">
                  autorisations du compte Google
                </A>
                . L’outil ne peut alors plus lire ni envoyer de courriel. Les
                échanges déjà consignés restent dans nos dossiers jusqu’à leur
                destruction (section{" "}
                <A href="#conservation">{n("conservation")}</A>). Pour en
                demander l’accès, la correction ou la destruction, écrivez au
                responsable (section <A href="#droits">{n("droits")}</A>).
              </P>

              <div className="mt-10 max-w-[66ch] rounded-2xl bg-wash p-6 md:p-8">
                <p className="text-eyebrow text-accent-deep">
                  Politique relative aux données utilisateur des services API Google
                </p>
                <p className="mt-3 text-[17px] leading-[1.7] text-ink">
                  L’utilisation et le transfert à toute autre application des
                  informations reçues des API Google par Web Estrie CRM
                  respectent la{" "}
                  <A href="https://developers.google.com/terms/api-services-user-data-policy">
                    Politique relative aux données utilisateur des services API
                    Google
                  </A>{" "}
                  (Google API Services User Data Policy), y compris les
                  exigences d’utilisation limitée.
                </p>
                <p
                  lang="en"
                  className="mt-4 text-[15px] italic leading-relaxed text-ink-soft"
                >
                  Web Estrie CRM’s use and transfer to any other app of
                  information received from Google APIs will adhere to Google API
                  Services User Data Policy, including the Limited Use
                  requirements.
                </p>
              </div>
            </LegalSection>

            {/* ——— 10 ——— */}
            <LegalSection id="modifications" index={n("modifications")} title={title("modifications")}>
              <P>
                Nous pouvons mettre à jour cette politique, notamment si nos
                outils ou nos fournisseurs changent. La date de la dernière mise
                à jour figure en haut de la page, et toute modification
                importante y est signalée.
              </P>
            </LegalSection>

            {/* ——— Nous joindre ——— */}
            <aside className="mt-4 max-w-[66ch] rounded-2xl bg-wash p-8 md:p-10">
              <p className="text-eyebrow text-accent-deep">Une question?</p>
              <p className="mt-4 max-w-[24ch] font-serif text-[clamp(1.5rem,2.8vw,1.9rem)] font-[430] leading-[1.15] tracking-[-0.014em] text-ink">
                Écrivez au responsable de la protection des renseignements.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="group mt-5 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-accent"
              >
                {site.email}
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            </aside>
          </div>
        </div>
      </Container>
    </>
  );
}
