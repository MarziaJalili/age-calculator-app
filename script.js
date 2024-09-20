const submitBtn = document.querySelector("button");
const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");
const validErrors = document.querySelectorAll(".valid-error");
// inputs
const day = document.querySelector(".day")
const month = document.querySelector(".month")
const year = document.querySelector(".year")

// texts
const dayText = document.querySelector(".day-count")
const monthText = document.querySelector(".month-count")
const yearText = document.querySelector(".year-count")



submitBtn.addEventListener("click", (event) => {
    // change the input values to numbers
    const dayNum = parseFloat(day.value)
    const monthNum = parseFloat(month.value)
    const yearNum = parseFloat(year.value)
    const difference = calculateDateDifference(dayNum, monthNum, yearNum);

    event.preventDefault();
    inputs.forEach(input => {
        const nextSib = input.nextElementSibling;
        const value = input.value;
        nextSib.style.display = "none";
        nextSib.nextElementSibling.style.display = "none";
        input.parentElement.style.color = "hsl(0, 1%, 44%)"
        input.style.borderColor = "hsl(0, 0%, 86%)";


        if (value === '') {
            nextSib.style.display = "block";
            input.style.borderColor = "hsl(0, 86%, 55%)";
            input.parentElement.style.color = "hsl(0, 86%, 55%)";
        } else if (parseFloat(value) < input.min || parseFloat(value) > input.max) {
            nextSib.style.display = "none";
            nextSib.nextElementSibling.style.display = "block";
            input.style.borderColor = "hsl(0, 86%, 55%)";
            input.parentElement.style.color = "hsl(0, 86%, 55%)";

        } else {
            dayText.innerHTML = difference.days
            monthText.innerHTML = difference.months
            yearText.innerHTML = difference.years
        }
    })
    console.log(dayNum)
    console.log(monthNum)
    console.log(yearNum)
    console.log(difference.years);
});


// 😁: freaking math that i forgot 
// 😎: oh, really... you didn't forget it you are just doing this to make it easier for yourself
function calculateDateDifference(day, month, year) {
    const currentDate = new Date();
    const startDate = new Date(year, month - 1, day); // month is zero-indexed

    // Calculate the difference in years, months, and days
    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    let days = currentDate.getDate() - startDate.getDate();

    // Adjust for negative days
    if (days < 0) {
        months--;
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += prevMonth.getDate(); // Number of days in the previous month
    }

    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

