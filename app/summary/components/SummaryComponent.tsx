import { useQuery } from "@blitzjs/rpc"
import getAggregateExpenses from "app/expenses/queries/getAggregateExpenses"
import React, { useEffect } from "react"
import { Doughnut } from "react-chartjs-2"
import "chart.js/auto"
import "chartjs-plugin-labels"
import { useCurrentUser } from "app/users/hooks/useCurrentUser"
import { NotFoundError } from "blitz"
import Chart from "chart.js/auto"

const SummaryComponent = () => {
  Chart.defaults.plugins.legend.display = false

  const currentUser = useCurrentUser()
  if (!currentUser) throw new NotFoundError()
  const [aggregateExpenses] = useQuery(getAggregateExpenses, currentUser.id)

  let [data, setData] = React.useState<any>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderWidth: 0,
      },
    ],
  })

  useEffect(() => {
    const newLabels: string[] = []
    const newColors: string[] = []
    const newValues: number[] = []

    const defaultColors: string[] = [
      "rgba(25, 25, 112, 0.4)",
      "rgba(0, 100, 0, 0.4)",
      "rgba(255, 0, 0, 0.4)",
      "rgba(255, 215, 0, 0.4)",
      "rgba(0, 255, 0, 0.4)",
      "rgba(0, 255, 255, 0.4)",
      "rgba(255, 0, 255, 0.4)",
      "rgba(255, 182, 193, 0.4)",
    ]

    aggregateExpenses.map((entry, i) => {
      console.log(i)
      newLabels.push(entry.category)
      newValues.push(entry._sum.amount ? entry._sum.amount : 0)
      newColors.push(defaultColors[i]!)
    })

    const data = {
      labels: newLabels,
      datasets: [
        {
          data: newValues,
          backgroundColor: newColors,
          borderWidth: 1,
          hoverOffset: 4,
        },
      ],
    }
    setData(data)
  }, [aggregateExpenses])

  return (
    <>
      <div className="px-24 py-10">
        <Doughnut data={data} />
      </div>
    </>
  )
}
export default SummaryComponent
