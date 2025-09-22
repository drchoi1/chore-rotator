import React, { useState, useEffect } from "react";

const today = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
const people = ["Evan", "Hyunjun", "Hee Joong", "Chloe"];
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
  const now = new Date();

  // Get the most recent Monday (including today if it's Monday)
  const dayOfWeek = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const daysSinceMonday = (dayOfWeek + 6) % 7; // Converts Sunday (0) to 6, Monday (1) to 0, etc.
  const mondayThisWeek = new Date(now);
  mondayThisWeek.setDate(now.getDate() - daysSinceMonday);
  mondayThisWeek.setHours(0, 0, 0, 0);

  // Anchor date (week 0) is still Jan 1, 2024
  const startDate = new Date("2024-01-01");
  startDate.setHours(0, 0, 0, 0);

  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const diffWeeks = Math.floor((mondayThisWeek - startDate) / msPerWeek);
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
            className="text-center font-bold text-lg py-2 rounded-t"
            style={{
              backgroundColor: memberColors[idx % memberColors.length],
              color: memberColors[idx % memberColors.length] === "#584053" ? "white" : "black"
            }}
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