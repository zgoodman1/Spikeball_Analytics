import tkinter as tk
from tkinter import *

root = tk.Tk()
w = root.winfo_screenwidth()
h = root.winfo_screenheight()
root.geometry("%dx%d" % (w, h))

button = Button(root, text="hahaha")
button.pack()

root.mainloop()
