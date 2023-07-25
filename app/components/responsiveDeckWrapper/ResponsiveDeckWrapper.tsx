import classNames from "classnames";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { DeckButton } from "./DeckButton";

export type ResponsiveDeckWrapperProps = {
  test?: any;
};

export const ResponsiveDeckWrapper: FC<
  PropsWithChildren<ResponsiveDeckWrapperProps>
> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [toggleDeck, setToggleDeck] = useState(false);

  useEffect(() => {
    let scrollTimeout: any;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollDepth =
          window.pageYOffset || document.documentElement.scrollTop;

        const threshold = 200;

        setIsScrolled(scrollDepth >= threshold);
      }, 10); // debounce delay
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // mobile breakpoint
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Desktop */}
      {!isMobile && (
        <div
          className={classNames("sticky top-8 float-right w-[600px] h-14 px-4")}
          style={{
            height: !isScrolled ? "580px" : "90vh",
          }}
        >
          {children}
        </div>
      )}

      {/* Mobile */}
      {isMobile && (
        <>
          <div className={classNames("!sticky top-8 h-9 mx-4")}>
            <DeckButton
              size={100}
              className={classNames(
                "cursor-pointer hover:scale-105",
                "hover:brightness-110 transition-all"
              )}
              onClick={() => setToggleDeck(true)}
            />
          </div>
          <div
            className={classNames(
              toggleDeck ? "block" : "hidden",
              "fixed top-1/2 right-0 transition-all",
              "-translate-y-1/2",
              "w-full h-full max-w-[600px]"
            )}
          >
            <div
              className={classNames(
                "absolute top-1/2 left-0",
                "p-4 w-6 h-24 z-50 bg-[#2E3974] border-2 border-[#F6D970]",
                "cursor-pointer flex justify-center items-center",
                "text-[#F6D970] text-3xl"
              )}
              onClick={() => setToggleDeck(false)}
            >
              {">"}
            </div>
            {children}
          </div>
        </>
      )}
    </>
  );
};
