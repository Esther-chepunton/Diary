// // app/highlights/page.js
// "use client";

// import { useDiary } from "../context/DiaryContext";
// import HighlightList from "../components/HighlightList";

// const HighlightsPage = () => {
//   const { entries } = useDiary();

//   // Filter entries to get only highlights
//   const highlights = entries.map(entry => ({
//     date: entry.date,
//     highlight: entry.highlight
//   }));

//   return (
//     <div>
//       <h2>All Highlights</h2>
//       {highlights.length === 0 ? (
//         <p>No highlights available. Add some entries to see highlights here.</p>
//       ) : (
//         <HighlightList highlights={highlights} />
//       )}
//     </div>
//   );
// };

// export default HighlightsPage;
