import tkinter as tk

root = tk.Tk()
w = root.winfo_screenwidth()
h = root.winfo_screenheight()
root.geometry("%dx%d" % (w, h))

button = tk.Button(root, text="Hello, world", fg='red', bg='black')
button.pack()

root.mainloop()
