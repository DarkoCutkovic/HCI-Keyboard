import numpy as np
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

x = np.loadtxt('id_s_a.txt', delimiter=',').reshape((-1, 1))
y = np.loadtxt('mt_s_a.txt', delimiter=',')

model = LinearRegression()
model.fit(x, y)

r_sq = model.score(x, y)
print('coefficient of determination:', r_sq)

print('y-Achsenabschnitt:', model.intercept_)
print('Steigung:', model.coef_)

plt.plot(x, y, 'ro')
plt.plot(x, model.predict(x), 'b')
plt.xlabel('ID')
plt.ylabel('Movement time')
#make the axis go up by 0.5

plt.axis([-0.1, 3.5, 0, 10000])

plt.show()

