// import { v4 as uid } from 'uuid'
import { uid } from 'uid'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { boardDefault } from './storedefaults'

export interface List {
  id: string
  title: string
  cardIds: string[]
  boardId: string
}

export interface Board {
  id: string
  name: string
  creatorId: string
  lists: Record<string, List>
  listOrder: string[]
  cards: Record<string, Card>
}

export type Boards = {
  [key: string]: Board
}

export interface Card {
  id: string
  title: string
  description: string
  currentList: string
}

export const useBoardStore = defineStore('boards', () => {
  const boards = useStorage<Boards>('boards', boardDefault)

  const getBoardById = computed(() => {
    return (boardId: string) => boards.value[boardId]
  })

  const getCardById = computed(() => {
    return (boardId: string, cardId: string) => {
      let board = boards.value[boardId]
      return board.cards[cardId]
    }
  })

  const getListById = computed(() => {
    return (boardId: string, listId: string) => {
      let board = boards.value[boardId]
      return board.lists[listId]
    }
  })

  const newBoard = (creatorId: string, boardName: string) => {
    if (!boardName || boardName.length < 1) {
      return Error('title must not be blank')
    }
    let id = uid()
    boards.value[id] = {
      id,
      name: boardName,
      creatorId,
      lists: {},
      listOrder: [],
      cards: {},
    }

    addListToBoard(id, 'My First List')

    return id
  }

  const addListToBoard = (boardId: string, listTitle: string) => {
    let board = boards.value[boardId]
    let newListId = uid()

    if (!listTitle || listTitle.length < 1) {
      return Error('title must not be blank')
    }

    board.lists[newListId] = {
      title: listTitle,
      id: newListId,
      cardIds: [],
      boardId: board.id,
    }

    board.listOrder.push(newListId)
  }

  const deleteBoard = (boardId: string) => {
    let board = boards.value[boardId]
    if (!board) return console.warn(`board doesn't exist! searched for ID: ${boardId}`)
    delete boards.value[boardId]
  }

  const deleteListFromBoard = (boardId: string, listId: string) => {
    let board = boards.value[boardId]

    let list = board.lists[listId]
    if (!list) return console.warn(`list doesn't exist! searched for ID: ${listId}`)
    let listPos = board.listOrder.indexOf(listId)
    board.listOrder.splice(listPos, 1)
    let cardsToDelete = [...list.cardIds]
    cardsToDelete.forEach((cardId) => {
      delete board.cards[cardId]
    })
    // delete board.lists[listId] <- this doesn't work
    let boardCopy = { ...board }
    delete boardCopy.lists[listId]
    boards.value[boardId] = boardCopy
  }

  const deleteCardFromBoard = (boardId: string, cardId: string) => {
    let board = boards.value[boardId]
    let card = board.cards[cardId]
    let currentListId = card.currentList
    let currentList = board.lists[currentListId]

    currentList.cardIds = currentList.cardIds.filter((id) => id !== cardId)
    delete board.cards[cardId]
  }

  const moveList = (boardId: string, posToMoveFrom: number, posToMoveTo: number) => {
    let board = boards.value[boardId]
    if (board.listOrder[posToMoveFrom] && board.listOrder[posToMoveTo]) {
      let idToMove = board.listOrder.splice(posToMoveFrom, 1)[0]
      board.listOrder.splice(posToMoveTo, 0, idToMove)
      return true
    }
    return false
  }

  const moveCardWithinList = (
    boardId: string,
    listId: string,
    posToMoveFrom: number,
    posToMoveTo: number,
  ) => {
    let board = boards.value[boardId]
    let list = board.lists[listId]
    let cardIds = [...list.cardIds]

    if (!cardIds[posToMoveFrom]) return false

    if (cardIds[posToMoveTo]) {
      let idToMove = cardIds.splice(posToMoveFrom, 1)[0]
      cardIds.splice(posToMoveTo, 0, idToMove)
      list.cardIds = cardIds
      return true
    }

    if (posToMoveTo >= cardIds.length) {
      let idToMove = cardIds.splice(posToMoveFrom, 1)[0]
      cardIds.push(idToMove)
      list.cardIds = cardIds
    }

    return false
  }

  const moveCardBetweenLists = (
    boardId: string,
    oldListId: string,
    newListId: string,
    posToMoveFrom: number,
    posToMoveTo: number,
  ) => {
    let board = boards.value[boardId]
    let oldList = board.lists[oldListId]
    let newList = board.lists[newListId]

    if (oldList && newList && board) {
      let idToMove = oldList.cardIds.splice(posToMoveFrom, 1)[0]
      newList.cardIds.splice(posToMoveTo, 0, idToMove)

      let card = board.cards[idToMove]
      card.currentList = newListId

      return true
    }

    return false
  }

  const addCardToBoard = (boardId: string, listId: string, cardTitle: string) => {
    let board = boards.value[boardId]
    let list = board.lists[listId]

    if (!cardTitle || cardTitle.length < 1) {
      return Error('title must not be blank')
    }

    let newCardId = uid()
    let card = {
      id: newCardId,
      title: cardTitle,
      description: '',
      currentList: listId,
    }

    board.cards[newCardId] = card
    list.cardIds.push(newCardId)
    return newCardId
  }

  const renameList = (boardId: string, listId: string, newTitle: string) => {
    if (!newTitle || newTitle.length < 1) {
      return 'title must not be blank'
    }
    let board = boards.value[boardId]
    if (!board) return console.warn(`board doesn't exist! searched for ID: ${boardId}`)
    let list = board.lists[listId]
    if (!list) return console.warn(`list doesn't exist! searched for ID: ${listId}`)

    list.title = newTitle
  }

  const renameBoard = (boardId: string, newTitle: string) => {
    if (!newTitle || newTitle.length < 1) {
      return Error('title must not be blank')
    }

    let board = boards.value[boardId]
    if (!board) {
      console.warn(`board doesn't exist! searched for ID: ${boardId}`)
      return Error('board does not exist')
    }

    board.name = newTitle
  }

  const renameCard = (boardId: string, cardId: string, newTitle: string) => {
    if (!newTitle || newTitle.length < 1) {
      return 'title must not be blank'
    }
    let board = boards.value[boardId]
    if (!board) return console.warn(`board doesn't exist! searched for ID: ${boardId}`)

    let card = board.cards[cardId]
    if (!card) return console.warn(`card doesn't exist! searched for ID: ${cardId}`)

    card.title = newTitle
  }

  const describeCard = (boardId: string, cardId: string, description: string) => {
    // if (!description || description.length < 1) {
    //   return 'enter some text for description'
    // }

    let board = boards.value[boardId]
    if (!board) return console.warn(`board doesn't exist! searched for ID: ${boardId}`)
    let card = board.cards[cardId]
    if (!card) return console.warn(`card doesn't exist! searched for ID: ${cardId}`)

    card.description = description ?? ''
  }

  if (Object.keys(boards.value ?? {}).length === 0) {
    let id = newBoard('1', 'My First Board')
    if (id instanceof Error) {
      console.error(id)
    } else {
      addListToBoard(id, 'To Do')
      addListToBoard(id, 'Doing')
      addListToBoard(id, 'Done')
    }
  }

  return {
    boards,
    newBoard,
    getBoardById,
    getCardById,
    getListById,
    deleteListFromBoard,
    deleteCardFromBoard,
    deleteBoard,
    moveList,
    addListToBoard,
    addCardToBoard,
    moveCardWithinList,
    renameList,
    renameCard,
    renameBoard,
    moveCardBetweenLists,
    describeCard,
  }
})
