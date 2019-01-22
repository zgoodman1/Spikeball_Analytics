import tkinter as tk
from PIL import Image, ImageTk
from tkinter import Frame, CENTER, Label, BOTH

root = tk.Tk()
w = root.winfo_screenwidth()
h = root.winfo_screenheight()
root.geometry("%dx%d" % (w, h))

# button = tk.Button(root, text="Hello, world", fg='red', bg='black')
# button.pack()

# creating background image of old well
image = Image.open("/Users/z_goodman/RSS_Project/old_well.jpg")
resized = image.resize((w, h))
img = ImageTk.PhotoImage(resized)
bgImg = tk.Label(root, image=img)
bgImg.pack(side="top", fill="both", expand=True)

# making a new frame to contain the UI
frame = Frame(root, bg='black', width=int(w * .85), height=int(h * .757))
frame.place(relx=.5, rely=.5, anchor=CENTER)


































root.mainloop()
