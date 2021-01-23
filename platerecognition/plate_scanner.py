import cv2
import pytesseract
import re

# import open source neural net
classifier = cv2.CascadeClassifier("resources/haarcascade_russian_plate_number.xml")

camera = cv2.VideoCapture(0)

while True:
    success, pic = camera.read()
    # read in image of liscence plate and convert to black and white
    picGray = cv2.cvtColor(pic, cv2.COLOR_BGR2GRAY)


    # use neural net to detect plate
    plate = classifier.detectMultiScale(picGray, 1.1, 5)


    for x, y, w, h in plate:
        cv2.rectangle(pic, (x, y), (x + w, y + h), (255, 0, 0), 5)


    # loop through co ordinates of plate and crop image to optimal parameters of plate
    for x,y,w,h in plate:
            croppedPlate = picGray[y+15:y+h-5, x+15:x+w-5]


    # if car plate not found return image
    try:
        croppedPlate # does a exist in the current namespace
    except NameError:
        print("Plate not found.")
        continue

    # double the size of the image
    bigImage = cv2.resize(croppedPlate, (int(croppedPlate.shape[1] * 2), int(croppedPlate.shape[0] * 2)), 3)
    # use median blur technique to reduce noise in the image
    finalImage = cv2.medianBlur(bigImage, 5)

    # display detected licence plate
    plateNumber = pytesseract.image_to_string(finalImage, 'eng', '-c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ --psm 8')
    plateNumber = re.sub(r'[\x0c]', '', plateNumber)
    plateNumber = plateNumber.replace("\n", "")

    if plateNumber == "DZI7YXR":
        print("Plate Found!")
        cv2.imshow("Result", pic)
        cv2.waitKey(0)
        exit()

    print(plateNumber)
