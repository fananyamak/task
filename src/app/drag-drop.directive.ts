// drag-drop.directive.ts
import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { TaskService } from './task.service';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  private draggingElement: HTMLElement | null = null;
  sortableList = document.querySelector('.sortable-list') as HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2, private taskService: TaskService) { }
  ngAfterViewInit(): void {

    const sortableList = this.el.nativeElement.querySelector('.sortable-list') as HTMLElement;

    if (sortableList) {
      this.renderer.listen(sortableList, 'drop', (event) => this.onDrop(event));
      this.renderer.listen(sortableList, 'dragenter', (event) => event.preventDefault());
    }

  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {

    const target = event.target as HTMLElement;

    if (target.tagName === 'I' && target.classList.contains('fa-grip-vertical')) {


      this.draggingElement = target.closest('li') as HTMLElement;



      setTimeout(() => this.renderer.addClass(this.draggingElement!, 'dragging'), 0);
      this.draggingElement!.addEventListener('dragend', () => this.renderer.removeClass(this.draggingElement!, 'dragging'));

    } else {
      event.preventDefault();
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {

    if (this.draggingElement) {

      this.renderer.removeClass(this.draggingElement, 'dragging');
      this.draggingElement = null;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.draggingElement) {

      this.renderer.setStyle(this.draggingElement, 'top', `${event.clientY}px`);
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();

  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(event: DragEvent): void {
    event.preventDefault();
  }




  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    let draggingItem = document.querySelector('.dragging') as HTMLElement;


    let siblings = Array.from(this.sortableList.querySelectorAll('.eachitem:not(.dragging)')) as HTMLElement[];

    let nextSibling = siblings.find((sibling: HTMLElement) => {
      return event.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });



    const nextNode = nextSibling?.closest("li")?.parentElement?.parentElement ? nextSibling?.closest("li")?.parentElement?.parentElement : null;
    const prevNode = draggingItem?.closest("li")?.parentElement?.parentElement ? draggingItem?.closest("li")?.parentElement?.parentElement : null;


    try {
      if (nextNode) {
        this.renderer.insertBefore(this.sortableList, prevNode, nextNode);
      }
      else {
        const newPrevnode = prevNode || null;
        this.renderer.appendChild(this.sortableList, newPrevnode);

      }

    } catch (error) {
      alert(error);
    }

    const draggedTaskId = draggingItem?.closest("li")?.dataset.iden;
    const targetTaskId = nextSibling?.closest("li")?.dataset.iden || null;



    const draggedTaskIndex = this.taskService.tasks.findIndex(task => task.id === Number(draggedTaskId));

    if (draggedTaskIndex !== -1) {

      const [draggedTask] = this.taskService.tasks.splice(draggedTaskIndex, 1);


      const targetTaskIndex = this.taskService.tasks.findIndex(task => task.id === Number(targetTaskId));



      if (targetTaskIndex !== -1) {
        this.taskService.tasks.splice(targetTaskIndex, 0, draggedTask);


        this.taskService.updateLocalStorage();
      }
      else {

        const targetTaskIndex2 = this.taskService.tasks.length;
        this.taskService.tasks.splice(targetTaskIndex2, 0, draggedTask);
        this.taskService.updateLocalStorage();
      }
    }
  }

}
