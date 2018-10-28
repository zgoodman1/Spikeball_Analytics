from tkinter import *
from tkinter import ttk


def change():
    print("change functon called")


def main():
    rootWindow = Tk()

    label = ttk.Label( rootWindow, text="Hello World!",
                       background = 'black', foreground = "white")
    label.pack()

    button1 = Button( rootWindow, text="Change Label",
                          background = 'black', foreground = "white", command=change)
    button1.pack()

    style = ttk.Style()
    style.configure("BW.TLabel", foreground="white", background="black")

    buttonTTK = ttk.Button( rootWindow, text="TTK BUTTON",style = "BW.TLabel", command=change)
    buttonTTK.pack()

    rootWindow.mainloop()

main()