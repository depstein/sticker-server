# Sticker Wiki

> Public Endpoint: https://sheltered-waters-08469.herokuapp.com/

## Parameters
| Key | Description | Options | Required | Default |
|---|---|---|---|---|
| type | Type of the sticker | [analogy, chartjunk, plain] | strictly required
| variation | Variation of the sticker type | [1,2,3] | strictly required
| value | Domain value | Any integer | strictly required
| unit | Domain unit | Any string (max 12 characters) | strictly required
| option | Animation type of the sticker | [pulse, shake] | strictly required
| color | Color of the sticker (only used for generic chartjunk/plain domain agnostic stickers) | [purple, gold, red, green, blue] | required | green
| goal | Domain goal (only used for chartjunk sticker) | Any integer (>= value) | required | If empty, goal == value

*Strictly required* means the server will response with a 400 error for missing parameter.

---
<br><br>

# /food

## Examples
### Analogy (Domain Relevant)
* /food/?type=analogy&variation=1&value=2500&unit=calories&option=shake 
[Public](https://sheltered-waters-08469.herokuapp.com/food/?type=analogy&variation=1&value=2500&unit=calories&option=shake) | [Local](http://localhost:5000/food/?type=analogy&variation=1&value=2500&unit=calories&option=shake)

* /food/?type=analogy&variation=2&value=2500&unit=calories&option=shake
[Public](https://sheltered-waters-08469.herokuapp.com/food/?type=analogy&variation=2&value=2500&unit=calories&option=shake) | [Local](http://localhost:5000/food/?type=analogy&variation=2&value=2500&unit=calories&option=shake)

* /food/?type=analogy&variation=3&value=2500&unit=calories&option=shake
[Public](https://sheltered-waters-08469.herokuapp.com/food/?type=analogy&variation=3&value=2500&unit=calories&option=shake) | [Local](http://localhost:5000/food/?type=analogy&variation=3&value=2500&unit=calories&option=shake)

### Chartjunk (Domain Relevant)
* /food/?type=chartjunk&variation=1&value=2500&unit=calories&option=shake&goal=3000
[Public](https://sheltered-waters-08469.herokuapp.com/food/?type=chartjunk&variation=1&value=2500&unit=calories&option=shake&goal=3000) | [Local](http://localhost:5000/food/?type=chartjunk&variation=1&value=2500&unit=calories&option=shake&goal=3000)

* /food/?type=chartjunk&variation=2&value=2500&unit=calories&option=shake&goal=3000
[Public](https://sheltered-waters-08469.herokuapp.com/food/?type=chartjunk&variation=2&value=2500&unit=calories&option=shake&goal=3000) | [Local](http://localhost:5000/food/?type=chartjunk&variation=2&value=2500&unit=calories&option=shake&goal=3000)

* /food/?type=chartjunk&variation=3&value=2500&unit=calories&option=shake&goal=3000
[Public](https://sheltered-waters-08469.herokuapp.com/food/?type=chartjunk&variation=3&value=2500&unit=calories&option=shake&goal=3000) | [Local](http://localhost:5000/food/?type=chartjunk&variation=3&value=2500&unit=calories&option=shake&goal=3000)

### Plain (Domain Relevant)
* /food/?type=plain&variation=1&value=2500&unit=calories&option=pulse
[Public](https://sheltered-waters-08469.herokuapp.com/food/?type=plain&variation=1&value=2500&unit=calories&option=pulse) | [Local](http://localhost:5000/food/?type=plain&variation=1&value=2500&unit=calories&option=pulse)

* /food/?type=plain&variation=2&value=2500&unit=calories&option=pulse
[Public](https://sheltered-waters-08469.herokuapp.com/food/?type=plain&variation=2&value=2500&unit=calories&option=pulse) | [Local](http://localhost:5000/food/?type=plain&variation=2&value=2500&unit=calories&option=pulse)

* /food/?type=plain&variation=3&value=2500&unit=calories&option=pulse
[Public](https://sheltered-waters-08469.herokuapp.com/food/?type=plain&variation=3&value=2500&unit=calories&option=pulse) | [Local](http://localhost:5000/food/?type=plain&variation=3&value=2500&unit=calories&option=pulse)

<br><br>

# /heaetbeat

## Examples

### Plain (Domain Relevant)
* /heartbeat/?type=plain&variation=1&value=110&unit=beats%20per%20minute&option=pulse
[Public](https://sheltered-waters-08469.herokuapp.com/heartbeat/?type=plain&variation=1&value=110&unit=beats%20per%20minute&option=pulse) | [Local](http://localhost:5000/heartbeat/?type=plain&variation=1&value=110&unit=beats%20per%20minute&option=pulse)

* /heartbeat/?type=plain&variation=2&value=110&unit=beats%20per%20minute&option=pulse
[Public](https://sheltered-waters-08469.herokuapp.com/heartbeat/?type=plain&variation=2&value=110&unit=beats%20per%20minute&option=pulse) | [Local](http://localhost:5000/heartbeat/?type=plain&variation=2&value=110&unit=beats%20per%20minute&option=pulse)

* /heartbeat/?type=plain&variation=3&value=110&unit=beats%20per%20minute&option=pulse
[Public](https://sheltered-waters-08469.herokuapp.com/heartbeat/?type=plain&variation=3&value=110&unit=beats%20per%20minute&option=pulse) | [Local](http://localhost:5000/heartbeat/?type=plain&variation=3&value=110&unit=beats%20per%20minute&option=pulse)

<br><br>

# /steps

## Examples

### Analogy (Domain Agnostic)
* /steps/?type=analogy&variation=1&value=2000&unit=steps&option=pulse
[Public](https://sheltered-waters-08469.herokuapp.com/steps/?type=analogy&variation=1&value=2000&unit=steps&option=pulse) | [Local](http://localhost:5000/steps/?type=analogy&variation=1&value=2000&unit=steps&option=pulse)

* /steps/?type=analogy&variation=2&value=2000&unit=steps&option=pulse
[Public](https://sheltered-waters-08469.herokuapp.com/steps/?type=analogy&variation=2&value=2000&unit=steps&option=pulse) | [Local](http://localhost:5000/steps/?type=analogy&variation=2&value=2000&unit=steps&option=pulse)

* /steps/?type=analogy&variation=3&value=2000&unit=steps&option=pulse
[Public](https://sheltered-waters-08469.herokuapp.com/steps/?type=analogy&variation=3&value=2000&unit=steps&option=pulse) | [Local](http://localhost:5000/steps/?type=analogy&variation=3&value=2000&unit=steps&option=pulse)

### Chartjunk (Domain Agnostic)
* /steps/?type=chartjunk&variation=1&value=2000&unit=steps&option=pulse&goal=3000
[Public](https://sheltered-waters-08469.herokuapp.com/steps/?type=chartjunk&variation=1&value=2000&unit=steps&option=pulse&goal=3000) | [Local](http://localhost:5000/steps/?type=chartjunk&variation=1&value=2000&unit=steps&option=pulse&goal=3000)

* /steps/?type=chartjunk&variation=2&value=2000&unit=steps&option=pulse&goal=3000
[Public](https://sheltered-waters-08469.herokuapp.com/steps/?type=chartjunk&variation=2&value=2000&unit=steps&option=pulse&goal=3000) | [Local](http://localhost:5000/steps/?type=chartjunk&variation=2&value=2000&unit=steps&option=pulse&goal=3000)

* /steps/?type=chartjunk&variation=3&value=2000&unit=steps&option=pulse&goal=3000
[Public](https://sheltered-waters-08469.herokuapp.com/steps/?type=chartjunk&variation=3&value=2000&unit=steps&option=pulse&goal=3000) | [Local](http://localhost:5000/steps/?type=chartjunk&variation=3&value=2000&unit=steps&option=pulse&goal=3000)


### Plain (Domain Relevant)
* /steps/?type=plain&variation=1&value=1200&unit=steps&option=shake
[Public](https://sheltered-waters-08469.herokuapp.com) | [Local](http://localhost:5000)

* /steps/?type=plain&variation=2&value=1200&unit=footsteps&option=shake
[Public](https://sheltered-waters-08469.herokuapp.com) | [Local](http://localhost:5000)

* /steps/?type=plain&variation=3&value=2000&unit=footsteps&option=pulse
[Public](https://sheltered-waters-08469.herokuapp.com) | [Local](http://localhost:5000)


<br><br>
# /generic

## Examples
### Analogy (Domain Agnostic)
* /generic/?type=analogy&variation=1&value=2500&unit=calories&option=shake
[Public](https://sheltered-waters-08469.herokuapp.com/generic/?type=analogy&variation=1&value=2500&unit=calories&option=shake) | [Local](http://localhost:5000/generic/?type=analogy&variation=1&value=2500&unit=calories&option=shake)

* /generic/?type=analogy&variation=2&value=1100&unit=steps&option=shake
[Public](https://sheltered-waters-08469.herokuapp.com/generic/?type=analogy&variation=2&value=1100&unit=steps&option=shake) | [Local](http://localhost:5000/generic/?type=analogy&variation=2&value=1100&unit=steps&option=shake)

* /generic/?type=analogy&variation=3&value=1500&unit=calories&option=shake
[Public](https://sheltered-waters-08469.herokuapp.com/generic/?type=analogy&variation=3&value=1500&unit=calories&option=shake) | [Local](http://localhost:5000/generic/?type=analogy&variation=3&value=1500&unit=calories&option=shake)

### Chartjunk (Domain Agnostic)
* /generic/?type=chartjunk&variation=1&value=2500&unit=calories&option=pulse&goal=3000&color=purple
[Public](https://sheltered-waters-08469.herokuapp.com/generic/?type=chartjunk&variation=1&value=2500&unit=calories&option=pulse&goal=3000&color=purple) | [Local](http://localhost:5000/generic/?type=chartjunk&variation=1&value=2500&unit=calories&option=pulse&goal=3000&color=purple)

* /generic/?type=chartjunk&variation=2&value=110&unit=beats%20per%20minute&option=shake&goal=150&color=green
[Public](https://sheltered-waters-08469.herokuapp.com/generic/?type=chartjunk&variation=2&value=110&unit=beats%20per%20minute&option=shake&goal=150&color=green) | [Local](http://localhost:5000/generic/?type=chartjunk&variation=2&value=110&unit=beats%20per%20minute&option=shake&goal=150&color=green)

* /generic/?type=chartjunk&variation=3&value=110&unit=beats%20per%20minute&option=shake&goal=150&color=blue
[Public](https://sheltered-waters-08469.herokuapp.com/generic/?type=chartjunk&variation=3&value=110&unit=beats%20per%20minute&option=shake&goal=150&color=blue) | [Local](http://localhost:5000/generic/?type=chartjunk&variation=3&value=110&unit=beats%20per%20minute&option=shake&goal=150&color=blue)

### Plain (Domain Agnostic)
* /generic/?type=plain&variation=1&value=110&unit=beats%20per%20minute&option=shake&color=blue
[Public](https://sheltered-waters-08469.herokuapp.com/generic/?type=plain&variation=1&value=110&unit=beats%20per%20minute&option=shake&color=blue) | [Local](http://localhost:5000/generic/?type=plain&variation=1&value=110&unit=beats%20per%20minute&option=shake&color=blue)

* /generic/?type=plain&variation=2&value=110&unit=pineapple&option=pulse&color=green
[Public](https://sheltered-waters-08469.herokuapp.com/generic/?type=plain&variation=2&value=110&unit=pineapple&option=pulse&color=green) | [Local](http://localhost:5000/generic/?type=plain&variation=2&value=110&unit=pineapple&option=pulse&color=green)

* /generic/?type=plain&variation=3&value=1110&unit=steps&option=pulse&color=blue
[Public](https://sheltered-waters-08469.herokuapp.com/generic/?type=plain&variation=3&value=1110&unit=steps&option=pulse&color=blue) | [Local](http://localhost:5000/generic/?type=plain&variation=3&value=1110&unit=steps&option=pulse&color=blue)

[Public](https://sheltered-waters-08469.herokuapp.com) | [Local](http://localhost:5000)