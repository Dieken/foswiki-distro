# See bottom of file for license and copyright
package Unit::TestSuite;

=begin TML

---+ package Unit::TestSuite

A collection of test cases. Subclass and implement include_tests to return
a list of TestCase (file) names. TestSuite is also a TestCase, so a suite can
include other suites.

This class is a general purpose and should not make any reference to
Foswiki.

=cut

use Moo;
use namespace::clean;
extends qw( Unit::TestCase );

# SMELL This property is a placeholder for test suite name parameter passed on
# on object creation. Need to be reconsidered.
has testSuite => ( is => 'rw', );

our @_newParameters = qw( testSuite );

sub include_tests {
    return ();
}

1;

__DATA__

Author: Crawford Currie, http://c-dot.co.uk

Copyright (C) 2008-2010 Foswiki Contributors
Copyright (C) 2007-2008 WikiRing, http://wikiring.com
All Rights Reserved.

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version. For
more details read LICENSE in the root of this distribution.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

As per the GPL, removal of this notice is prohibited.

