"use client"

import { useState, useEffect } from "react"
import { Clock, Zap } from "lucide-react"
import { fetchLimitedOffer } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";


const CampaignTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSelectCoupon = (slug) => {
    navigate(`/CouponsDetails/${slug}`);

  };
    useEffect(() => {
        const fetchCoupons = async () => {
            const data = await fetchLimitedOffer();
            console.log("data",data)
            //if (Array.isArray(data) && data.length > 0) {
              setCoupons(data);
            //}
            setLoading(false);
        };

        fetchCoupons();
    }, []);
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const nextMidnight = new Date()
      nextMidnight.setHours(24, 0, 0, 0) // midnight tonight

      const diffInSeconds = Math.max(Math.floor((nextMidnight.getTime() - now.getTime()) / 1000), 0)
      const hours = Math.floor(diffInSeconds / 3600)
      const minutes = Math.floor((diffInSeconds % 3600) / 60)
      const seconds = diffInSeconds % 60

      setTimeLeft({ hours, minutes, seconds })
    }

    updateCountdown() // initial
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const totalSeconds = 24 * 60 * 60
  const currentSeconds = timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds
  const overallProgress = ((totalSeconds - currentSeconds) / totalSeconds) * 100

  const isActive = currentSeconds > 0

  return (
    <section className="w-full py-6 mt-4 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Compact Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-2">
              <Zap className="w-4 h-4" />
              FLASH SALE - LIMITED TIME
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
               {coupons.payout_model?.toLowerCase() === "percentage"
              ? `${coupons.payout || "0.00"}%` 
              : `${coupons.currency || "Rs."} ${coupons.payout || "0.00"}`}    {coupons.title}</h2>

             
          </div>

          {/* Main Horizontal Layout */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              {/* Timer Display */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium text-gray-600">Time Left</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-3">
                  {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>

                {/* Horizontal Progress Bars */}
                <div className="space-y-2">
                  {/* Overall Progress */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-1000"
                      style={{ width: `${overallProgress}%` }}
                    ></div>
                  </div>

                  {/* Time Units */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className="font-bold text-red-600">{timeLeft.hours}h</div>
                      <div className="w-full bg-red-100 rounded-full h-1">
                        <div
                          className="h-1 bg-red-500 rounded-full transition-all duration-1000"
                          style={{ width: `${((24 - timeLeft.hours) / 24) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-orange-600">{timeLeft.minutes}m</div>
                      <div className="w-full bg-orange-100 rounded-full h-1">
                        <div
                          className="h-1 bg-orange-500 rounded-full transition-all duration-1000"
                          style={{ width: `${((60 - timeLeft.minutes) / 60) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-yellow-600">{timeLeft.seconds}s</div>
                      <div className="w-full bg-yellow-100 rounded-full h-1">
                        <div
                          className="h-1 bg-yellow-500 rounded-full transition-all duration-1000"
                          style={{ width: `${((60 - timeLeft.seconds) / 60) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg">
                  <div className="text-sm font-semibold">SAVE TODAY</div>
                  <div className="text-2xl font-bold">   {coupons.payout_model?.toLowerCase() === "percentage"
              ? `${coupons.payout || "0.00"}%`
              : `${coupons.currency || "Rs."} ${coupons.payout || "0.00"}`}</div>
                  <div className="text-xs opacity-90">{coupons.title}</div>
                </div>
              </div>

              {/* CTA */}
              <div>
                <button
                  className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"
                  }`}
                  onClick={() => handleSelectCoupon(coupons.title)}
                >
                
                    <span className="flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      Grab Deal Now!
                    </span>
               
                </button>

                {isActive && (
                  <p className="text-xs text-gray-500 mt-2 text-center">⚡ Limited quantities • Act fast!</p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Notice */}
          <div className="text-center mt-3">
            <p className="text-sm text-gray-600">
              🔥 <strong>Hurry!</strong> This offer expires when the timer reaches zero!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CampaignTimer
