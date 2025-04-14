import React from "react";
import { Box, Button, Chip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { motion } from "framer-motion";

interface QuestionProps {
  question: string;
  options: string[];
  selected: string[];
  onSelect: (word: string) => void;
  onUnselect: (index: number) => void;
}

const MotionBox = motion(Box);

const Question: React.FC<QuestionProps> = ({
  question,
  options,
  selected,
  onSelect,
  onUnselect,
}) => {
  const parts = question.split("_____________");

  return (
    <Box sx={{ mt: 2, mx: { xs: 2, sm: 5, md: 6 } }}>
      {/* Sentence with blanks */}
      <MotionBox
        sx={{ fontSize: "1.25rem", lineHeight: 1.8 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < selected.length && (
              <Chip
                label={selected[i] || "______"}
                onClick={() => onUnselect(i)}
                onDelete={selected[i] ? () => onUnselect(i) : undefined}
                deleteIcon={selected[i] ? <ClearIcon /> : undefined}
                sx={{
                  mx: 1,
                  fontWeight: "bold",
                  border: "1px dashed #2196f3",
                  color: "#1976d2",
                  backgroundColor: selected[i] ? "#e3f2fd" : "#fff",
                  "&:hover": {
                    backgroundColor: "#bbdefb",
                  },
                }}
              />
            )}
          </React.Fragment>
        ))}
      </MotionBox>

      {/* Option Buttons */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mt: 4,
        }}
      >
        {options.map((option, i) => {
          const isSelected = selected.includes(option);
          return (
            <motion.div
              key={i}
              style={{ flex: "1 1 calc(50% - 16px)" }}
              whileHover={
                !isSelected
                  ? {
                      y: -2,
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    }
                  : {}
              }
              whileTap={!isSelected ? { scale: 0.97 } : {}}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={() => onSelect(option)}
                disabled={isSelected}
                sx={{
                  backgroundColor: isSelected ? "#e0e0e0" : "#bbdefb",
                  color: isSelected ? "#777" : "#0d47a1",
                  fontWeight: "bold",
                  py: 1.5,
                  cursor: isSelected ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: isSelected ? "#e0e0e0" : "#90caf9",
                  },
                }}
              >
                {option}
              </Button>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default Question;
