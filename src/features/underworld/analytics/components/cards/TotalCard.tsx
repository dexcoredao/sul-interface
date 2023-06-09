import classNames from "classnames"
import { BigNumber } from "ethers"
import numeral from "numeral"
import { useAppContext } from "contexts/AppContext"
import { UnderworldPair } from "../../types/UnderworldPair"
import Progress from "../Progress"

export type TotalData = {
  amount: BigInt
  volumeIn24H: BigInt
  totalUsers: BigInt
  topMarkets: UnderworldPair[]
}

type AttributesByBorrowType = {
  progressColor: "secondary1" | "primary1" | "primary2"
  title: string
  users: string
}

type AttributesMapByBorrowType = {
  borrow: AttributesByBorrowType
  asset: AttributesByBorrowType
  supply: AttributesByBorrowType
}

const AttributesMapByBorrow = {
  borrow: {
    progressColor: "primary2",
    title: "Total Borrow",
    users: "Borrowers",
  },
  asset: {
    progressColor: "primary1",
    title: "Total Available",
    users: "Suppliers",
  },
  supply: {
    progressColor: "secondary1",
    title: "Total Supply",
    users: "Suppliers",
  },
} as AttributesMapByBorrowType

const TotalCard = ({
  containerClass = "",
  data,
  borrow = "borrow",
  loading = false,
}: {
  containerClass?: string
  data: TotalData
  borrow?: "borrow" | "asset" | "supply"
  loading?: boolean
}) => {
  const attributes = AttributesMapByBorrow[borrow]
  const isLoading = data.amount === BigInt(0) || loading
  const { tokenUtilService } = useAppContext()

  return (
    <div
      className={classNames({
        [containerClass]: true,
        "bg-white border rounded shadow-md": true,
      })}
    >
      <div className="px-8 py-5 font-semibold border-b">{attributes.title}</div>
      <div className="px-8 py-8">
        <div className="mb-4 text-xl font-medium">
          {isLoading ? (
            <div className="inline-block w-48 h-5 rounded loading"></div>
          ) : (
            numeral(Number(data.amount) / 100.0).format("($0,0.00)")
          )}
        </div>
        <div className="mb-4 text-sm font-medium text-gray-400">
          Top {data.topMarkets.length} Markets
        </div>
        {isLoading ? (
          <>
            <Progress loading={isLoading} containerClass="mb-4" />
            <Progress loading={isLoading} containerClass="mb-4" />
            <Progress loading={isLoading} containerClass="mb-4" />
          </>
        ) : (
          data.topMarkets.map((marketData) => (
            <Progress
              loading={isLoading}
              key={marketData.name}
              containerClass="mb-4"
              title={tokenUtilService.pairSymbol(
                marketData.asset?.symbol,
                marketData.collateral?.symbol
              )}
              color={attributes.progressColor}
              progress={
                BigNumber.from(
                  borrow === "borrow"
                    ? marketData.totalBorrow
                    : borrow === "asset"
                    ? marketData.totalAsset
                    : BigNumber.from(marketData.totalBorrow)
                        .add(BigNumber.from(marketData.totalAsset))
                        .toBigInt()
                )
                  .mul(BigNumber.from("10000"))
                  .div(BigNumber.from(data.amount))
                  .toNumber() / 10000
              }
            />
          ))
        )}
        {/* <div className="pt-6 mt-8 border-t">
          <div className="flex justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-400">
                24H Supply Volume
              </div>
              <div className="mt-2">
                {isLoading ? (
                  <div className="w-32 h-5 rounded loading"></div>
                ) : (
                  numeral(data.volumeIn24H).format("$0,0.00")
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-400">
                # of {attributes.users}
              </div>
              <div className="mt-2">
                {isLoading ? (
                  <div className="w-20 h-5 ml-auto rounded loading"></div>
                ) : (
                  data.totalUsers
                )}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default TotalCard