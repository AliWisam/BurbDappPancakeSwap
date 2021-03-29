import React, { useEffect } from 'react';
import { getAllLeaderboard } from '../services/LeaderboardFunctions';

const Leaderboard = ({ leaderboard, setLeaderboard }) => {
  useEffect(() => {
    getAllLeaderboard(leaderboard, setLeaderboard);
  }, [leaderboard, setLeaderboard]);

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            {/* Title */}
            <h2 className="card-header-title">Leaderboard (Top 200 Holders)</h2>
          </div>
          {/* Table */}
          <div className="table-responsive mb-0">
            <table className="table table-sm table-nowrap card-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard &&
                  leaderboard.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">{item.id + 1}</th>
                      <td>{item.balance}</td>
                      <td>{item.address}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
