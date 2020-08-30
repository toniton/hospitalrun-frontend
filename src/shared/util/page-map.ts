type PageMap = {
  path: string
}
export const pageMap = new Map<string, PageMap>()
pageMap.set('dashboard', { path: '/' })
pageMap.set('patient:new', { path: '/patients/new' })
pageMap.set('patient:search', { path: '/patients' })
pageMap.set('appointment:new', { path: '/appointments/new' })
pageMap.set('appointment:search', { path: '/appointments' })
pageMap.set('lab:new', { path: '/labs/new' })
pageMap.set('lab:search', { path: '/labs' })
pageMap.set('medication:new', { path: '/medications/new' })
pageMap.set('medication:search', { path: '/medications' })
pageMap.set('incident:new', { path: '/incidents/new' })
pageMap.set('incident:search', { path: '/incidents' })
pageMap.set('imaging:new', { path: '/imaging/new' })
pageMap.set('imaging:search', { path: '/imaging' })
pageMap.set('user:settings', { path: '/settings' })
pageMap.set('user:logout', { path: '/patients/new' })

export const getPageMapByPath = (path: string) =>
  ([...pageMap.entries()].find(([, value]) => value.path === path) || [])[0] || null
