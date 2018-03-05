
let getColors = ()=>([
    "#f44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#2196F3",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#FFEB3B",
    "#FF9800",
    "#795548",
    "#9E9E9E",
    "#607D8B"
  ])

let getThemeColors = (color)=>{
    const colors = getColors()
    return colors.map((item)=>({color:item,check:color==item}))
}

export {getColors,getThemeColors}