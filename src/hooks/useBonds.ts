import { useState, useEffect } from 'react'
const useLuxorBonds = () => {
  let url = 'https://api.thorus.fi/bonds.json'
  // if (chainId === 1284) url = 'https://api.thorus.fi/moonbeam_bonds.json'
  // if (chainId === 250) url = 'https://api.thorus.fi/moonbeam_bonds.json'

//   const [data, setData] = useState(null)
//   useEffect(() => {
//     const fetchData = async () => {
//       fetch(url + '?t=' + new Date().getTime())
//         .then((response) => response.json())
//         .then((result) => {
//           setData(result)
//         })
//     }
//     fetchData()

//     const interval = setInterval(() => {
//       fetchData()
//     }, 10000)
//   }, [])
//   return { data }
}
export default useLuxorBonds
