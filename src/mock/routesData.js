import jstRoutes from "@/router/jstRoutes"
import jstSystemRoutes from "@/router/jstSystemRoutes"

export const navMenuList = [
    ...jstRoutes
];


export const systemRoutes = [
    ...navMenuList,
    ...jstSystemRoutes
]
