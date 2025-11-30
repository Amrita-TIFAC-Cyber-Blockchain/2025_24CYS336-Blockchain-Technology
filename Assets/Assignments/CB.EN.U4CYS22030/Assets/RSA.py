import math

 

def is_prime(num):

    if num < 2:

        return False

    for i in range(2, int(num ** 0.5) + 1):

        if num % i == 0:

            return False

    return True

 

def gcd(a, b):

    while b != 0:

        a, b = b, a % b

    return a

 

def mod_inverse(e, phi):

    for d in range(2, phi):

        if (d * e) % phi == 1:

            return d

    return None

 

def encrypt(msg, e, n):

    return pow(msg, e, n)

 

def decrypt(cipher, d, n):

    return pow(cipher, d, n)

 

def get_possible_e(phi):

    possible_e = [e for e in range(2, phi) if gcd(e, phi) == 1]

    if len(possible_e) <= 10:

        print(f"Possible values of e: {possible_e}")

    else:

        print(f"First 10 possible values of e: {possible_e[:10]}")

    return possible_e

 

def main():

    n = e = d = phi = None

 

    while True:

        print("\n=== RSA Cryptosystem ===")

        print("1. Generate Keys")

        print("2. Encrypt / Sign Message")

        print("3. Exit")

 

        choice = input("Enter choice: ")

 

        if choice == '1':

            p = int(input("Enter prime number p: "))

            q = int(input("Enter prime number q: "))

 

            if not (is_prime(p) and is_prime(q)):

                print("Both p and q must be prime numbers!")

                continue

 

            n = p * q

            phi = (p - 1) * (q - 1)

            print(f"n = {n}, phi(n) = {phi}")

 

            possible_e = get_possible_e(phi)

            e = int(input("Choose public key exponent e from above list: "))

            if e not in possible_e:

                print("Invalid e value! Must be from the list above.")

                continue

 

            d = mod_inverse(e, phi)

            print(f"Private key (d): {d}")

            print(f"Check: (e * d) mod phi = {(e * d) % phi}")

 

        elif choice == '2':

            if not all([n, e, d]):

                print("Please generate keys first (Option 1).")

                continue

 

            print("\n1. Encrypt with e (Public Key)")

            print("2. Sign with d (Private Key)")

            opt = input("Choose operation: ")

 

            if opt == '1':

                msg = int(input("Enter message (as integer): "))

                cipher = encrypt(msg, e, n)

                print(f"Encrypted message: {cipher}")

                decrypted = decrypt(cipher, d, n)

                print(f"Decrypted message using d: {decrypted}")

 

            elif opt == '2':

                msg = int(input("Enter message (as integer): "))

                signature = encrypt(msg, d, n)

                print(f"Signed message: {signature}")

                verified = decrypt(signature, e, n)

                print(f"Verified message using e: {verified}")

 

            else:

                print("Invalid option!")

 

        elif choice == '3':

            print("Exiting...")

            break

 

        else:

            print("Invalid choice! Try again.")

 

if __name__ == "__main__":

    main()