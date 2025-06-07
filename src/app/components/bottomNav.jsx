"use client";
import { useState, useEffect, useRef } from "react";
import { BottomNavigation as MuiBottomNavigation } from "@mui/material";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Home, Package, PackageOpen } from "lucide-react";
import { animated, useTransition } from "@react-spring/web";
import { useRouter } from "@/hooks/useRouter";
import { navItems } from "./nav.list";
import { toast } from "sonner";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#151316bf",
      paper: "#151316bf",
    },
    text: {
      primary: "#fff",
    },
  },
});

export default function BottomNavigation() {
  const [value, setValue] = useState(
    null
  );
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const toolboxRef = useRef(null);
  const toolboxTriggerRef = useRef(null);

  const tools = navItems().filter((item) => item.title.toLowerCase() === "tools").flatMap((item) => item.subItems);


  useEffect(() => {
    setValue(window.location.pathname.includes("tool") ? 1 : 0);
  }, [])


  const transitions = useTransition(showPopup, {
    from: {
      transform: "scale(0.1) translateY(50%) translateX(-50%)",
      opacity: 0,
      width: "0%",
      height: "0%",
    },
    enter: {
      transform: "scale(1) translateY(0%) translateX(-50%)",
      opacity: 1,
      width: "95%",
      height: "70%",
    },
    leave: {
      transform: "scale(0.1) translateY(50%) translateX(-50%)",
      opacity: 0,
      width: "0%",
      height: "0%",
    },
    config: { tension: 300, friction: 20 },
  });

  const handleBottomNavChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      setShowPopup((prev) => !prev)
      if (showPopup) {
        setTimeout(() => {
          setValue(window.location.pathname.includes("tool") ? 1 : 0)
        }, 100);
      }
    } else {
      setShowPopup(false);
      router.push("/");
    }

  };

  useEffect(() => {
    if (!showPopup) return;

    const handleClickOutside = (e) => {
      if (toolboxRef.current && (!toolboxRef.current.contains(e.target) && !toolboxTriggerRef.current.contains(e.target))) {
        setShowPopup(false);
        setValue(window.location.pathname.includes("tool") ? 1 : 0)
      }
    };

    const handleWindowScroll = (e) => {
      const popup = toolboxRef.current;
      if (!popup) return;

      const isPopupScrolling = e.target === popup || popup.contains(e.target);

      if (!isPopupScrolling) {
        setShowPopup(false);
        setValue(window.location.pathname.includes("tool") ? 1 : 0)
      }
    };

    window.addEventListener("wheel", handleWindowScroll, { passive: true });
    window.addEventListener("touchmove", handleWindowScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("wheel", handleWindowScroll);
      window.removeEventListener("touchmove", handleWindowScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);


  return (
    <ThemeProvider theme={darkTheme}>
      <MuiBottomNavigation
        value={value}
        onChange={handleBottomNavChange}
        className="md:!hidden"
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.text.primary,
          backdropFilter: "blur(10px)",
          zIndex: 1300,
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          sx={{ color: "inherit" }}
          aria-label="Home"
        />
        <BottomNavigationAction
          ref={toolboxTriggerRef}
          label="Toolbox"
          icon={showPopup ? <PackageOpen /> : <Package />}
          sx={{ color: "inherit" }}
          aria-label="Toolbox"
        />
      </MuiBottomNavigation>

      {transitions((style, item) =>
        item ? (
          <animated.div
            ref={toolboxRef}
            className="fixed bottom-[65px] modern:bottom-[70px] left-1/2 z-[1400] transform rounded-2xl p-5 w-[95%] shadow-2xl border border-white/10 backdrop-blur-lg bg-white/10 text-white overflow-y-auto flex flex-wrap gap-3 justify-start content-start max-h-[70vh] max-w-[calc(100vw-1rem)] modern:max-w-[calc(100vw-2rem)] sm:max-w-[80vw] show-scrollbar"
            style={{
              ...style,
              transformOrigin: "center bottom",
            }}
          >
            {tools.map((tool, index) => {
              const isComing = tool.isAvailable === "coming";
              const isDisabled = !tool.isAvailable || isComing;

              return (
                <div
                  key={index}
                  onClick={() => {
                    if (isDisabled) {
                      toast.info("This tool is not available right now.");
                      return;
                    }
                    router.push(tool.url);
                    setShowPopup(false);
                  }}
                  className={`
              relative w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] rounded-xl flex flex-col items-center justify-center text-center p-2 gap-2
              border border-white/10 backdrop-blur-md bg-white/5 hover:bg-white/15 transition-all duration-200
              ${isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:scale-105"}
            `}
                >
                  <tool.icon className="text-white text-xl" />
                  <span className="text-xs font-semibold leading-tight">{tool.title}</span>

                  {(tool.isNew || tool.isHot) && (
                    <div className={`
                absolute top-1 right-1 text-[10px] px-1 py-0.5 rounded-full font-bold uppercase
                ${tool.isNew ? "bg-purple-600/80" : ""}
                ${tool.isHot ? "bg-orange-500/80" : ""}
              `}>
                      {tool.isNew ? "NEW" : "HOT"}
                    </div>
                  )}

                  {isDisabled && (
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center text-xs text-white font-semibold opacity-0 hover:opacity-100 transition-all duration-300 select-none">
                      {isComing ? "Coming Soon" : "Not Available"}
                    </div>
                  )}
                </div>
              );
            })}
          </animated.div>
        ) : null
      )}
    </ThemeProvider>
  );
}
