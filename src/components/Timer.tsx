import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";

const MotionBox = motion(Box);

const Timer = ({ seconds, onTimeout }: { seconds: number; onTimeout: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [timerColor, setTimerColor] = useState("green");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);

      if (timeLeft <= 5) {
        setPulse(true);
        setTimerColor("red");
      } else if (timeLeft <= 10) {
        setTimerColor("goldenrod");
      } else {
        setPulse(false);
        setTimerColor("green");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        mt: { xs: 2, sm: 3, md: 4 },
        mb: { xs: 2, sm: 3 },
        px: 2,
      }}
    >
      <MotionBox
        sx={{
          fontWeight: "bold",
          color: timerColor,
          fontSize: {
            xs: "1.2rem",
            sm: "2.0rem",
            md: "2.0rem",
          },
          transition: "color 0.3s ease",
        }}
        animate={{ scale: pulse ? [1, 1.1, 1] : 1 }}
        transition={{ repeat: pulse ? Infinity : 0, duration: 0.6 }}
      >
        ⏱️ Time Left: {timeLeft}s
      </MotionBox>

      {/* Progress bar */}
      <Box
        sx={{
          mt: 2,
          width: {
            xs: "90%",
            sm: "80%",
            md: "60%",
          },
          height: "8px",
          backgroundColor: "#e0e0e0",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${(timeLeft / seconds) * 100}%`,
            backgroundColor: timerColor,
            borderRadius: "10px",
            transition: "width 1s ease-in-out",
          }}
        />
      </Box>
    </Box>
  );
};

export default Timer;
