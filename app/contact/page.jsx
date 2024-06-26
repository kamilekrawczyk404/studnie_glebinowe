import React from "react";
import { ArticleSection } from "../../components/ArticleSection";
import HorizontalLine from "../../components/HorizontalLine";
import MessageForm from "../../components/MessageForm";
import { Container } from "../../components/Container";
import SocialsList from "../../components/SocialsList";
import ContactList from "../../components/ContactList";

const metadataContent = {
  title: "Informacje Kontaktowe",
  url: "https://and-wiert.pl/contact",
  imageSrc: "https://and-wiert.pl/images/gallery/gallery5.webp",
  description:
    "And-Wiert - profesjonalna firma specjalizująca się w Wierceniu Studni Głębinowych. Zapewniamy kompleksowe usługi z zakresu budowy i konserwacji studni wodnych, gwarantując wysoką jakość, sprawność oraz bezpieczeństwo. Skorzystaj z naszego doświadczenia i zapewnij sobie niezawodne źródło czystej wody.",
};

export const metadata = {
  title: metadataContent.title,
  description: metadataContent.description,
  twitter: {
    title: metadataContent.title,
    images: [metadataContent.imageSrc],
    description: metadataContent.description,
    url: metadataContent.url,
  },
  openGraph: {
    title: metadataContent.title,
    images: [metadataContent.imageSrc],
    description: metadataContent.description,
    url: metadataContent.url,
  },
  canonicalUrl: {
    context: "https://schema.org",
    type: "Organization",
    name: metadataContent.title,
    url: metadataContent.url,
    logo: "https://and-wiert.pl/images/favicon.png",
  },
};

export default function Contact() {
  return (
    <>
      <Container className={`bg-white`}>
        <ArticleSection title={"Bądźmy w kontakcie"}>
          <div
            className={
              "w-full flex lg:flex-row flex-col xl:gap-32 lg:gap-16 md:gap-8 gap-8"
            }
          >
            <div className={"flex flex-col space-y-4 w-full"}>
              <p className={"text-dark-blue"}>
                Jeśli masz pytania, potrzebujesz dodatkowych informacji lub
                chcesz nawiązać współpracę, skontaktuj się z nami. Wypełnij
                formularz obok, a nasz zespół odpowie na Twoją wiadomość tak
                szybko, jak to możliwe.
              </p>
              <HorizontalLine className={"w-full"} />
              <p className={"text-xl"}>Informacje kontaktowe</p>
              <ContactList
                className={"flex-col !items-start gap-4 text-dark-blue"}
              />
              <HorizontalLine className={"w-full"} />
              <p className={"text-xl"}>Media społecznościowe</p>
              <SocialsList />
            </div>
            <div className={"flex w-full lg:py-0 pt-8"}>
              <MessageForm />
            </div>
          </div>
        </ArticleSection>
      </Container>
    </>
  );
}
