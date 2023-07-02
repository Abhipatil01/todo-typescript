import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './template/ListTemplate'


const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement
  itemEntryForm.addEventListener('submit', (e: SubmitEvent)=> {
    e.preventDefault();

    const input = document.getElementById('newItem') as HTMLInputElement
    const newEntryText = input.value.trim()
    if(!newEntryText.length) return

    const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id + 1) : 1
    const newItem = new ListItem(itemId.toString(), newEntryText)
    fullList.addItem(newItem)
    template.render(fullList)
  })

  const clearItemsButton = document.getElementById('clearItemsButton') as HTMLButtonElement
  clearItemsButton.addEventListener('click', ()=> {
    fullList.clearList()
    template.clear()
    template.render(fullList)
  })

  fullList.load()
  template.render(fullList)
}

document.addEventListener('DOMContentLoaded', initApp)