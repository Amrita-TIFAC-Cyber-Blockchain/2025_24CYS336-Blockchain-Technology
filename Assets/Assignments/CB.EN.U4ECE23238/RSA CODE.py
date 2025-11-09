
print(" RSA Algorithm ")

# --------- Step 1: Input Prime Numbers p and q ---------
while True:
    p = int(input("Enter prime number p: "))
    q = int(input("Enter prime number q: "))

    # Check if both are prime
    is_p_prime = True
    is_q_prime = True

    for i in range(2, int(p ** 0.5) + 1):
        if p % i == 0:
            is_p_prime = False
            break

    for i in range(2, int(q ** 0.5) + 1):
        if q % i == 0:
            is_q_prime = False
            break

    if is_p_prime and is_q_prime:
        break
    else:
        print("Both p and q must be prime. Try again.")

# --------- Step 2: Calculate n and phi ---------
# --------- n is modulus used for both public and private keys --------
n = p * q
phi = (p - 1) * (q - 1)
print(f"\nPublic modulus (n): {n}")
print(f"Euler's Totient (φ(n)): {phi}")

# --------- Step 3: Choose public exponent e ---------
while True:
    e = int(input("Enter public exponent e (1 < e < φ(n) and gcd(e, φ(n)) = 1): "))

    # Compute GCD
    a, b = e, phi
    while b != 0:
        a, b = b, a % b
    gcd = a

    if 1 < e < phi and gcd == 1:
        break
    else:
        print("Invalid e. Try again.")

# --------- Step 4: Choose private exponent d ---------
while True:
    d = int(input("Enter private exponent d (should satisfy (d*e) % φ(n) = 1): "))
    if (d * e) % phi == 1:
        break
    else:
        print("Invalid d. Try again.")

# --------- Step 5: Menu for Encryption/Decryption ---------
while True:
    print("\n==== MENU ====")
    print("1. Encrypt")
    print("2. Decrypt")
    print("3. Exit")
    choice = input("Enter your choice: ")

    if choice == "1":
        m = int(input("Enter the message to encrypt (as integer, < n): "))
        if m < n:
            # Encryption: c = m^e % n
            c = pow(m, e, n)
            print(f"Encrypted Cipher Text: {c}")
        else:
            print("Message must be less than n.")

    elif choice == "2":
        c = int(input("Enter the cipher to decrypt: "))
        # Decryption: m = c^d % n
        m = pow(c, d, n)
        print(f"Decrypted Original Message: {m}")

    elif choice == "3":
        print("Exiting...")
        break

    else:
        print("Invalid choice. Try again.")
