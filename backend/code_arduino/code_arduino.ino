
#include <IRremote.h>
IRrecv IR(7);

#include "DHT.h"

// Definit la broche de l'Arduino sur laquelle la
// broche DATA du capteur est reliee
#define DHTPIN 2
#define ventilateurPIN 3 // broche -> pour ventilateur
#define buzzerPIN 5      // broche -> pour buzzer

// Definit le type de capteur utilise
#define DHTTYPE DHT11

// Declare un objet de type DHT
// Il faut passer en parametre du constructeur
// de l'objet la broche et le type de capteur
DHT dht(DHTPIN, DHTTYPE);

void setup()
{
  Serial.begin(9600);
  IR.enableIRIn();

  // Initialise la capteur DHT11
  dht.begin();
  pinMode(ventilateurPIN, OUTPUT);
  pinMode(buzzerPIN, OUTPUT);

  // process(inChar);
}
bool etat;
static char inChar;
void loop()
{
  if (IR.decode())
  {

    // Serial.print(IR.decodedIRData.decodedRawData);
    delay(1500);
    IR.resume();
  }

  inChar = Serial.read();
  if (IR.decodedIRData.decodedRawData == 3125149440 || inChar == '1')
  {
    digitalWrite(ventilateurPIN, HIGH);
  }
  if (IR.decodedIRData.decodedRawData == 3860463360 && inChar == '0')
  {

    digitalWrite(ventilateurPIN, LOW);
  }

  int t = dht.readTemperature();
  int h = dht.readHumidity();

  Serial.print(t);
  Serial.print("/");
  Serial.println(h);

  delay(1500);
  if (t > 26)
  {
    digitalWrite(ventilateurPIN, HIGH); // le ventilateur se met à tourner

    tone(buzzerPIN, 1500, 800); // le buzzer se met à sonner
  }
  else
  {

    digitalWrite(ventilateurPIN, LOW); // le ventilateur s'arrête
    noTone(buzzerPIN);                 // le buzzer s'arrête
  }
}
