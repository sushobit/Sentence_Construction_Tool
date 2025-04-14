import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "./data/sample.json";
import Question from "./components/Question";
import Timer from "./components/Timer";
import FeedbackScreen from "./components/FeedbackScreen";
import { Box, Button, Typography } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function App() {

  //  To switch to live data from JSON Server,
  // To Start the JSON Server, run "npx json-server --watch sample.json --port 5000"
  // const [questions, setQuestions] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:5000/data")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setQuestions(json.questions);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching data:", err);
  //     });
  // }, []);
  
  
  const questions = data.data.questions;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>(["", "", "", ""]);
  const [answers, setAnswers] = useState<
    { question: string; selected: string[]; correct: string[] }[]
  >([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [started, setStarted] = useState(false);
  const [openExitDialog, setOpenExitDialog] = useState(false);
  const quizRef = useRef<HTMLDivElement | null>(null);

  const current = questions[index];

  const handleSelect = (word: string) => {
    const emptyIndex = selected.findIndex((w) => w === "");
    if (emptyIndex !== -1) {
      const newSelected = [...selected];
      newSelected[emptyIndex] = word;
      setSelected(newSelected);
    }
  };

  const handleUnselect = (i: number) => {
    const newSelected = [...selected];
    newSelected[i] = "";
    setSelected(newSelected);
  };

  const nextQuestion = () => {
    const record = {
      question: current.question,
      selected,
      correct: current.correctAnswer,
    };
    setAnswers([...answers, record]);
    setSelected(["", "", "", ""]);
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setShowFeedback(true);
    }
  };

  const isComplete = selected.every((word) => word !== "");

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-300">
      {/* Welcome Section */}
      {!started && (
        <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          bgcolor: "#fff",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon + Heading */}
          <Box sx={{ mb: 2 }}>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/sorting-answers.png"
              alt="icon"
              style={{ margin: "0 auto", width: 40, height: 40 }}
            />
          </Box>
      
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            Sentence Construction
          </Typography>
          <Typography variant="body1" sx={{ color: "gray", mb: 4, maxWidth: 400 }}>
            Select the correct words to complete the sentence by arranging the provided options in the right order.
          </Typography>
      
          {/* Info Grid */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              mb: 4,
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Time Per Question
              </Typography>
              <Typography>30 sec</Typography>
            </Box>
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Total Questions
              </Typography>
              <Box
                sx={{
                  border: "2px solid green",
                  borderRadius: "6px",
                  px: 2,
                  py: 0.5,
                  display: "inline-block",
                  minWidth: "50px",
                }}
              >
                <Typography>10</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Coins
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    bgcolor: "gold",
                    borderRadius: "50%",
                    mr: 1,
                  }}
                />
                <Typography>100</Typography>
              </Box>
            </Box>
          </Box>
      
          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              sx={{ px: 4, py: 1.5, fontWeight: "bold", borderColor: "#3f51b5", color: "#3f51b5" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back
            </Button>
            <Button
              variant="contained"
              sx={{ px: 4, py: 1.5, fontWeight: "bold", backgroundColor: "#3f51b5" }}
              onClick={handleStart}
            >
              Start
            </Button>
          </Box>
        </motion.div>
      </Box>
      
      )}

      {/* Quiz Section */}
      {started && (
        <div ref={quizRef} className="min-h-screen w-full flex items-center justify-center bg-white"
        style={{
          backgroundColor: "White", 
          margin: "3%", 
          borderRadius: "50px",
        }}>
          <Box sx={{ width: "100%", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, sm: 10 }, position: "relative" }}>

            {/* Exit Button (Top Right) */}
            <Box
              sx={{
                position: { xs: "static", sm: "absolute" },
                top: 16,
                right: 22,
                display: "flex",
                justifyContent: "flex-end",
                mt: { xs: 2, sm: 0 },
                mb: { xs: 2, sm: 0 },
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setOpenExitDialog(true)}
                sx={{
                  color: "#000",
                  borderColor: "#000",
                  fontWeight: "bold",
                  px: 3,
                  py: 1,
                  borderRadius: "20px",
                  textTransform: "none",
                }}
              >
                Quit
              </Button>
            </Box>

            <Dialog open={openExitDialog} onClose={() => setOpenExitDialog(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: "20px" },}}>
              <DialogTitle textAlign="center"></DialogTitle>
              <DialogContent sx={{ textAlign: "center", py: 2, pt: 8 }}>
                Are you sure you want to exit the quit? <br/> None of your answers will be saved.
              </DialogContent>
              <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button variant="outlined" onClick={() => setOpenExitDialog(false)}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setOpenExitDialog(false);
                    setStarted(false); 
                  }}
                >
                  Quit
                </Button>
              </DialogActions>
            </Dialog>


            {/* Dynamic Progress Bar */}
            <Box sx={{ display: "flex", gap: 1, mb: 4, justifyContent: "center" }}>
              {questions.map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: { xs: 20, sm: 24 },
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: i <= index ? "#f59e0b" : "#e0e0e0",
                    transition: "background-color 0.3s ease",
                  }}
                />
              ))}
            </Box>

            <AnimatePresence>
              {!showFeedback ? (
                <motion.div
                  key={`question-${index}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                >
                  <Timer seconds={30} onTimeout={nextQuestion} />
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
                    Question {index + 1} of {questions.length}
                  </Typography>
                  <Question
                    question={current.question}
                    options={current.options}
                    selected={selected}
                    onSelect={handleSelect}
                    onUnselect={handleUnselect}
                  />
                  <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <Button
                    variant="outlined"
                      onClick={nextQuestion}
                      disabled={!isComplete}
                      sx={{
                        mt: 6,
                        px: 4,
                        py: 1.5,
                        color: "black",
                        fontSize: "1rem",
                        borderColor: "black",
                        borderRadius: "8px",
                        cursor: isComplete ? "pointer" : "not-allowed",
                        "&:hover": {
                          backgroundColor: isComplete ? "#135ba1" : "#90caf9",
                        },
                      }}
                    >
                      →
                    </Button>
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -60 }}
                  transition={{ duration: 0.5 }}
                >
                  <FeedbackScreen
                    results={answers}
                    score={answers.filter(
                      (a) => JSON.stringify(a.selected) === JSON.stringify(a.correct)
                    ).length}
                    onRestart={() => {
                      setIndex(0);
                      setSelected(["", "", "", ""]);
                      setAnswers([]);
                      setShowFeedback(false);
                      setStarted(false); 
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </div>
      
      )}
    </div>
  );
}

export default App;
