package br.ufc.dc.validc.util;

import java.nio.charset.StandardCharsets;
import java.util.Random;

import javax.xml.bind.DatatypeConverter;

import org.bouncycastle.jcajce.provider.digest.SHA3;
import org.bouncycastle.jcajce.provider.digest.SHA3.DigestSHA3;

/**
 * Update to sha-3
 * 
 * https://en.wikipedia.org/wiki/SHA-3#Comparison_of_SHA_functions
 *
 */
public final class UUIDGenerator {
	private static final Random random = new Random();

	private UUIDGenerator() {
	}

	public static String getHashFromString(String elem) {
		String text = new StringBuilder().append(random.nextInt()).append(elem).append(",")
				.append(System.currentTimeMillis()).toString();

		DigestSHA3 sha3 = new SHA3.Digest224();
		sha3.update(text.getBytes(StandardCharsets.UTF_8));
		return DatatypeConverter.printHexBinary(sha3.digest()).toLowerCase();
	}
}
