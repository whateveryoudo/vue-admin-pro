const getters = {
    open : state => state.app.sidebar.open,
    permission_routes : state => state.permission.routes,
    routeSetted : state => state.permission.routeSetted,
    roles : state => state.user.info.roles
}

export default getters