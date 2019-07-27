const getters = {
    open : state => state.app.sidebar.open,
    permission_routes : state => state.permission.routes,
    roles : state => state.user.info.roles
}

export default getters