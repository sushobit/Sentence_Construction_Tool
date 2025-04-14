import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";

interface FeedbackProps {
  results: {
    question: string;
    correct: string[];
    selected: string[];
  }[];
  score: number;
  onRestart: () => void;
}

const FeedbackScreen: React.FC<FeedbackProps> = ({
  results,
  score,
  onRestart,
}) => {
  const percentageScore = Math.round((score / results.length) * 100);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", px: 2, py: 6 }}>
      {/* Score circle and message */}
      <Box textAlign="center" mb={4}>
        <Box sx={{ position: "relative", display: "inline-flex", mb: 2 }}>
          <CircularProgress
            variant="determinate"
            value={percentageScore}
            size={100}
            thickness={4.5}
            sx={{ color: "#4caf50" }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {percentageScore}
            </Typography>
            <Typography variant="body2">Overall Score</Typography>
          </Box>
        </Box>

        <Typography variant="body1" color="text.secondary" maxWidth={600} mx="auto" mb={2}>
          While you correctly formed several sentences, there are a couple of areas where
          improvement is needed. Pay close attention to sentence structure and word placement
          to ensure clarity and correctness. Review your responses below for more details.
        </Typography>

        <Button
          variant="outlined"
          onClick={onRestart}
          sx={{
            mt: 2,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Go to Dashboard
        </Button>
      </Box>

      {/* Feedback cards */}
      <Box display="flex" flexDirection="column" gap={3}>
        {results.map((res, i) => {
          const isCorrect =
            JSON.stringify(res.selected) === JSON.stringify(res.correct);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                sx={{
                  borderLeft: `5px solid ${isCorrect ? "#4caf50" : "#f44336"}`,
                  backgroundColor: isCorrect ? "#f1f8f5" : "#fff0f0",
                  borderRadius: "12px",
                  boxShadow: 1,
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Prompt <span style={{ float: "right", fontWeight: 400 }}>{i + 1}/{results.length}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {res.question}
                  </Typography>

                  <Typography variant="body2" gutterBottom>
                    <strong>Your response:</strong>{" "}
                    <span style={{ color: isCorrect ? "#4caf50" : "#f44336", fontWeight: 500 }}>
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {res.selected.join(" ")}
                  </Typography>

                  {!isCorrect && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body2">
                        <strong>Correct response:</strong> {res.correct.join(" ")}
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default FeedbackScreen;
