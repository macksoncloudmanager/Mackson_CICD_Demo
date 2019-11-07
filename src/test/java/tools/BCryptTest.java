package tools;

import static org.junit.Assert.*;

import org.junit.Test;
import tools.BCrypt;


public class BCryptTest {

	private String passwdHash;
	private String PWSalt;
	
	@Test
	public final void testHashpw() {
		PWSalt = BCrypt.gensalt();
		passwdHash = BCrypt.hashpw("Test",PWSalt);
		System.out.println(passwdHash);
		
		if (passwdHash.isEmpty()) {
			fail("Empty Password");
		} else {
			assertTrue(true);
		}
	}

	@Test
	public final void testCheckpw() {
		
		assertTrue(BCrypt.checkpw("Test","$2a$10$zpi.iCGfYQ/J2GCpj9tgueYgG4fMVIVis4BgIzs/Tj6cV2HpTtFAy"));
	}

}
