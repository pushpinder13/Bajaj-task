import express from "express";

const app = express();
app.use(express.json());

// === Your real details ===
const FULL_NAME = "pushpinder_singh"; // lowercase with underscore
const DOB = "07082005"; // ddmmyyyy
const EMAIL = "pushpinder693.be22@chitkara.edu.in";
const ROLL_NUMBER = "2210990693";
// =========================

app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input. Expected { data: [ ... ] }"
            });
        }

        let odd_numbers = [];
        let even_numbers = [];
        let alphabets = [];
        let special_characters = [];
        let sum = 0;
        let lettersOnly = [];

        data.forEach(item => {
            if (/^\d+$/.test(item)) { // numeric string
                let num = parseInt(item);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
            }
            else if (/^[a-zA-Z]+$/.test(item)) { // only alphabets
                alphabets.push(item.toUpperCase());
                // push each letter individually for concat_string
                item.split("").forEach(ch => lettersOnly.push(ch));
            }
            else { // special characters
                special_characters.push(item);
            }
        });

        let reversed = lettersOnly.reverse();
        let concat_string = reversed.map((ch, i) =>
            i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
        ).join("");

        // Send minified JSON so arrays are always on one line
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        }));

    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
