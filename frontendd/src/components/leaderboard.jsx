"use client"

import { useEffect, useRef } from "react"

const leaderboardData = [
  { rank: 1, walletId: "0x7a23...8f91", projectsFunded: 24, largestContribution: "5.2 ETH" },
  { rank: 2, walletId: "0x3b45...9d21", projectsFunded: 19, largestContribution: "4.7 ETH" },
  { rank: 3, walletId: "0x8c12...3e67", projectsFunded: 15, largestContribution: "3.8 ETH" },
  { rank: 4, walletId: "0x2f98...7a34", projectsFunded: 12, largestContribution: "3.5 ETH" },
  { rank: 5, walletId: "0x6d54...1b89", projectsFunded: 10, largestContribution: "2.9 ETH" },
  { rank: 6, walletId: "0x9e32...4c56", projectsFunded: 8, largestContribution: "2.6 ETH" },
  { rank: 7, walletId: "0x1a87...5f23", projectsFunded: 7, largestContribution: "2.3 ETH" },
  { rank: 8, walletId: "0x4d76...2e45", projectsFunded: 6, largestContribution: "2.0 ETH" },
  { rank: 9, walletId: "0xb321...8d67", projectsFunded: 5, largestContribution: "1.8 ETH" },
  { rank: 10, walletId: "0x5f43...9c12", projectsFunded: 4, largestContribution: "1.5 ETH" },
]

const Leaderboard = () => {
  const tableRef = useRef(null)

  useEffect(() => {
    // Animation for the border
    const animateBorder = () => {
      if (!tableRef.current) return

      const borderElement = tableRef.current.querySelector(".animated-border")
      if (!borderElement) return

      const keyframes = [{ backgroundPosition: "0% 0%" }, { backgroundPosition: "300% 0%" }]

      const options = {
        duration: 3000,
        iterations: Number.POSITIVE_INFINITY,
      }

      borderElement.animate(keyframes, options)
    }

    animateBorder()
  }, [])

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Top Contributors Leaderboard</h2>

        <div ref={tableRef} className="relative max-w-4xl mx-auto">
          {/* Animated border */}
          <div className="animated-border absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 via-white to-blue-500 opacity-70 blur-sm bg-size-300"></div>

          <div className="relative bg-black rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/80">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Wallet ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Projects Funded</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Largest Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-800 ${index < 3 ? "bg-gray-900/40" : "hover:bg-gray-900/20"} transition-colors`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {index < 3 ? (
                            <span
                              className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 
                              ${
                                index === 0
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : index === 1
                                    ? "bg-gray-400/20 text-gray-300"
                                    : "bg-amber-700/20 text-amber-600"
                              }`}
                            >
                              {item.rank}
                            </span>
                          ) : (
                            <span className="text-gray-400">{item.rank}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-300">{item.walletId}</td>
                      <td className="px-6 py-4 text-gray-300">{item.projectsFunded}</td>
                      <td className="px-6 py-4 text-blue-400 font-medium">{item.largestContribution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Leaderboard