import React, { useState, useEffect } from "react";

const today = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
const people = ["A", "B", "C", "D"];
const chores = [
  ["Free Week (enjoy the weekend!)"],
  [
    "Take out indoor trash to backyard bins this week",
    "Empty bathroom trash can",
    "Take out trash bins to curb on Sunday",
  ],
  [
    "Clean the microwave (all purpose cleaner spray bottle)",
    "Wipe down the kitchen counters (all purpose cleaner spray bottle)",
    "Sweep the kitchen and dining room",
    "Mop the kitchen and dining room (1/2 tsp all purpose cleaner in mop bucket)",
    "Wash bath mat, bathroom rug, hand towels in both bathrooms, and kitchen drying rags",
  ],
  [
    "Clean bathroom sinks (magic eraser and water)",
    "Clean bathroom toilets from top to bottom (all purpose cleaner spray bottle and rags)",
    "Clean bathroom toilet bowls (toilet bowl cleaner)",
    "Pick up big trash items from bathroom floors",
    "Mop bathroom floors (1/2 tsp all purpose cleaner in mop bucket)",
  ],
];
const memberColors = ["#584053", "#8DC6BF", "#FCBC66", "#F97B4F"];

function getCurrentWeekIndex() {
  const startDate = new Date("2024-01-01"); // anchor date (e.g., week 0)
  const now = new Date();
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const diffWeeks = Math.floor((now - startDate) / msPerWeek);
  return diffWeeks % people.length;
}

function WeeklyChores() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const weekIndex = getCurrentWeekIndex();
    const rotatedPeople = [...people.slice(weekIndex), ...people.slice(0, weekIndex)];
    const assigned = chores.map((choreList, i) => ({
    person: rotatedPeople[i],
    chores: choreList
    }));
    setAssignments(assigned);
  }, []);

  return (
    <div className="chore-card mb-6 border-b pb-4">
      <h1 className="text-2xl font-bold mb-4">Weekly Chore Assignments</h1>
      <p className="text-center text-sm text-gray-600 mb-4">Today is {today}</p>
      {assignments.map(({ person, chores }, idx) => (
        <div
          key={idx}
          className="mb-6 border rounded-md p-4 text-center"
          style={{ borderColor: "#ccc" }}
        >
          <div
            className="text-white font-bold text-lg py-2 rounded-t"
            style={{ backgroundColor: memberColors[idx % memberColors.length] }}
          >
          {person}
          </div>
          <ul className="list-disc list-inside mt-2 space-y-2">
            {chores.map((chore, i) => (
              <li key={i}>{chore}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default WeeklyChores;