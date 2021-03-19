import cv2
import pytesseract
import re

# import open source neural net
classifier = cv2.CascadeClassifier("resources/haarcascade_russian_plate_number.xml")
counter = 0

with open("testdataset/correctplate.txt", "r") as infile:
    for line in infile:

        # read in image of liscence plate and convert to black and white
        pic = cv2.imread("testdataset/Cars"+ str(counter) +".png")
        picGray = cv2.cvtColor(pic, cv2.COLOR_BGR2GRAY)

        # use neural net to detect plate
        plate = classifier.detectMultiScale(picGray, 1.1, 5)

        # loop through co ordinates of plate and crop image to optimal section of plate
        for x, y, w, h in plate:
            croppedPlate = picGray[y + 15:y + h - 5, x + 15:x + w - 5]

        # if car plate not found return image
        try:
            croppedPlate  # does a exist in the current namespace
        except NameError:
            print("Plate not found.")
            exit()

        # double the size of the image
        bigImage = cv2.resize(croppedPlate, (int(croppedPlate.shape[1] * 2), int(croppedPlate.shape[0] * 2)))
        # use median blur technique to reduce noise in the image
        finalImage = cv2.medianBlur(bigImage, 5)

        # display detected licence plate
        plateNumber = pytesseract.image_to_string(finalImage, 'eng',
                                                  '--psm 8 -c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')

        plateNumber = re.sub(r'[\x0c]', '', plateNumber)

        if plateNumber.rstrip() == line.rstrip():
            print("Test passed. Plate: " + plateNumber)
        else:
            print("Test failed. Plate: " + plateNumber + " " + line)

        counter = counter + 1

        if not line.strip():
            break
