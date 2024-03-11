import tensorflow as tf
import numpy as np
import json

# Format: [frequency, channel, speed, is_5g]
data = np.array([
    [2412, 1, 30, 0],
    [5805, 161, 150, 1],
    [5785, 157, 200, 1],
    [5785, 157, 150, 1],
    [5785, 157, 193, 1],
    [5765, 153, 300, 1],
    [5745, 149, 40, 1],
    [2412, 1, 30, 0],
    [5220, 44, 432, 1],
    [5200, 36, 323, 1],
    [5180, 36, 23, 0],
    [5180, 36, 21, 0],
    [5180, 36, 12, 0],
    [2472, 13, 91, 0],
    [2462, 11, 23, 0],
    [2462, 6, 43, 0],
    [5745, 149, 600, 1]
])

X = data[:, :-1]
y = data[:, -1]

model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(1, input_shape=(3,), activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

model.fit(X, y, epochs=100)

predictions = model.predict([[5342, 133, 400]])

outputFile = open("modelres.json", "w")

with open("modelinput.js") as f:
    data = json.load(f)
    
    if data != []:
        predictions = model.predict([data])
        
        with open("modelres.json", "w") as output_file:
            json.dump(predictions.tolist(), output_file)