"use client";
import { useState, useEffect } from "react";
import { BottomNavigation as MuiBottomNavigation } from "@mui/material";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Home, Package, PackageOpen } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";
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

  const tools = navItems().filter((item) => item.title.toLowerCase() === "tools").flatMap((item) => item.subItems);


  useEffect(() => {
    setValue(window.location.pathname.includes("tool") ? 1 : 0);
  }, [])


  const popupStyle = useSpring({
    transform: showPopup
      ? "scale(1) translateY(0%)"
      : "scale(0.1) translateY(50%)",
    opacity: showPopup ? 1 : 0,
    width: showPopup ? "95%" : "0%",
    height: showPopup ? "70%" : "0%",
    borderRadius: "10px",
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
          label="Toolbox"
          icon={showPopup ? <PackageOpen /> : <Package />}
          sx={{ color: "inherit" }}
          aria-label="Toolbox"
        />
      </MuiBottomNavigation>

      {value === 1 && (
        <animated.div
          className="fixed bottom-[70px] left-1/2 bg-[#202124] border border-[#46464d] p-5 z-[1400] flex gap-3 flex-wrap justify-start items-start overflow-y-auto"
          style={{
            ...popupStyle,
            transform: "translateX(-50%)",
            transformOrigin: "center bottom",
          }}
        >
          {tools.map((tool, index) => (
            <button
              key={index}
              disabled={!tool.isAvailable}
              onClick={() => {
                if (!tool.isAvailable) {
                  toast.info("This tool is not available right now.");
                  return
                }
                router.push(tool.url);
                setShowPopup(false);
              }}
              className={`w-24 h-24 border border-[#37373d] bg-card/30 hover:bg-card/50 flex flex-col items-center justify-center gap-2 rounded-md cursor-pointer transition-all duration-200 ${tool.isAvailable ? "" : "opacity-50"} relative group overflow-hidden ${location && location.pathname === tool.url ? "bg-card/60" : ""}`}
            >
              {<tool.icon />}
              <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>{tool.title}</span>
              {tool.isNew || tool.isHot && <span className={`text-xs ${tool.isNew ? "bg-purple-700/50" : "bg-orange-700/50"} font-black w-full h-1 absolute bottom-0 left-0 flex items-center justify-center group-hover:h-4 transition-all duration-300`}><span className="opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase text-xs">{tool.isNew ? "new" : "hot"}</span></span>}
            </button>
          ))}
        </animated.div>
      )}
    </ThemeProvider>
  );
}
