import create from 'zustand';

export enum NoteType {
  LINE = 'line',
  SQUARE = 'square',
  CIRCLE = 'circle',
}

const [useStore] = create((set) => ({
  //Tools
  selectedNoteType: NoteType.LINE,
  setNoteType: (type: NoteType) => set(() => ({ selectedNoteType: type })),

  selectedColor: '#555555',
  setColor: (color: string) => set(() => ({ selectedColor: color })),

  //Shotcuts
  isImageDrawing: false,
  setImageDrag: (isImageDrawing: boolean) =>
    set((state) => ({ isImageDrawing })),
}));

export default useStore;
