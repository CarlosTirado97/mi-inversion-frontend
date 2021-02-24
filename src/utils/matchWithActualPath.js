export default (location, path) => {
    let locationPath = location.pathname
    if (locationPath == '/' && path == '/') {
        return true
    }

    let pathFragments = path.split('/')

    if (locationPath[locationPath.length - 1] == '/') {
        locationPath = locationPath.slice(0, locationPath.length - 1)
    }

    let locationFragments = locationPath.split('/')

    if (pathFragments.length === locationFragments.length) {
        const {
            locationFragmentsCount,
            pathFragmentsCount
        } = compareFragments({ locationFragments, pathFragments })

        if (
            pathFragmentsCount > 0 &&
            pathFragmentsCount === locationFragmentsCount
        ) {
            return true
        }
    }
}

function compareFragments({ locationFragments, pathFragments }) {
    let locationFragmentsCount = 0
    let pathFragmentsCount = 0

    pathFragments.forEach((f, i) => {
        if (f != '{param}') {
            if (f == locationFragments[i]) {
                pathFragmentsCount++
            }
            locationFragmentsCount++
        }
    })
    return { locationFragmentsCount, pathFragmentsCount }
}
