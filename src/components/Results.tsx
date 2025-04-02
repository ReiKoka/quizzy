import { useEffect, useState } from "react";
import { Result } from "../utils/types";
import { getAllResults } from "../services/services";
import { showToast } from "./ui/ShowToast";

import { format } from "date-fns";

const formatString = "EEEE do 'of' MMM, yyyy";

function Results() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getAllResults();
        if (data) {
          setResults(data);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
        showToast("error", "Failed to fetch results. Please try again later.");
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="font-secondary text-primary mb-3 text-center text-xl font-semibold text-balance md:text-2xl lg:my-4 lg:text-3xl xl:my-6 md:portrait:my-4">
        Previous Quiz Results
      </h1>
      <div className="h-full grow overflow-hidden p-3">
        <div className="rounded-lg border-base-content/20 bg-base-100  overflow-auto border h-full">
          <table className="font-primary table-pin-cols table h-auto">
            <thead className="font-secondary text-primary text-base font-medium">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Date</th>
                <th>Time</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {results &&
                results.map((result) => (
                  <tr className="capitalize">
                    <th>{result.id}</th>
                    <td>{result.userName}</td>
                    <td>{result.category}</td>
                    <td>{result.difficultySetting}</td>
                    <td>{format(result.date, formatString)}</td>
                    <td>{result.totalTimeTaken}</td>
                    <td>
                      {result.points} / {result.maxPossiblePoints}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Results;
