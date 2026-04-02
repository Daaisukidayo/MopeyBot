export default {
  sortingOptions: ["0", "1", "2", "3"],

  baseCachedHistory: {
    page: 1,
    sortType: 0,
    rareAnimalId: null,
    filter: false,
    history: []
  },

  baseHistoryPage: {
    id: null,
    points: 0,
    rares: 0,
    endDate: `${Date.now()}`,
    playType: 0,
    difficulty: 1,
    raresList: {},
    events: []
  },
}