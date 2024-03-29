import { Container } from "./Partials/Container.jsx";
import { Link } from "./Partials/Link.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faSadTear } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Anchor } from "./Partials/Anchor.jsx";
import { useContext } from "react";
import { ComponentContext } from "../Providers/ComponentContext.jsx";

export const Footer = () => {
  const { contactDetails, pageLinks, scrollToTheElement } =
    useContext(ComponentContext);
  return (
    <Container className={"bg-dark-blue"}>
      <footer
        className={"flex sm:flex-row flex-col gap-8 justify-between py-8"}
      >
        <div className={"flex gap-16 text-gray-100"}>
          <section className={"space-y-4"}>
            <Link
              className={"text-gray-100 text-3xl font-bold"}
              href={"https://and-wiert.pl"}
            >
              <FontAwesomeIcon icon={faDroplet} className={"mr-1"} />
              And-Wiert
            </Link>
            <div>
              <h2 className={"sm:text-xl text-lg"}>Studnie głębinowe</h2>
              <p className={"sm:text-base text-sm"}>
                Tel: {contactDetails.telephone}
              </p>
              <p className={"sm:text-base text-sm"}>
                E-mail: {contactDetails.email}
              </p>
            </div>
          </section>

          <div
            className={
              "md:flex hidden flex-col items-start justify-between text-lg text-gray-100"
            }
          >
            {pageLinks.map((link, index) => (
              <Anchor
                key={index}
                className={"transition hover:text-dark-orange"}
                underlineColor={"bg-dark-orange"}
                animated={true}
                onClick={() => scrollToTheElement(index)}
                title={link.title}
              >
                {link.title}
              </Anchor>
            ))}
          </div>
        </div>

        <div className={"text-gray-100 text-lg space-y-4"}>
          <div>
            <Link
              href={contactDetails.facebook}
              title={"Odwiedź nas na Facebook'u"}
              className={"items-start self-start"}
            >
              <FontAwesomeIcon icon={faFacebook} className={"text-2xl mr-1"} />
              Facebook
            </Link>
          </div>
        </div>
      </footer>
      <div
        className={
          "flex md:flex-row flex-col md:justify-between items-center border-t-[.1rem] border-gray-100 sm:py-4 py-2"
        }
      >
        <div className={"flex items-center"}>
          <div className={"text-dark-orange"}>
            Copyright © <span>{new Date().getFullYear()}</span>{" "}
            <span className={"text-gray-100"}>And-Wiert</span>
          </div>
        </div>
        <div className={"flex items-center"}>
          <span className={"text-gray-100 mr-1"}>Realizacja -</span>
          <Link
            className={"text-dark-orange"}
            href={"mailto:kamilekkrawczyk404@gmail.com"}
            title={"Realizacja - Kamil Krawczyk"}
          >
            Kamil Krawczyk
          </Link>
        </div>
      </div>
    </Container>
  );
};