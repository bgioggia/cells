# cells
This project is a Cellullar Automaton using a Boolean Network. 
You can play with a hosted version at https://brandongioggia.com/cells.html

Boolean networks consist of a bunch of nodes that can either be on or off. In discrete time,
these nodes turn themselves on or off based on the states of other cells that they have relationships
with. 

A cellular automaton is just a boolean network on a grid of cells. Each cell has relationships to its
4 neighboring cells. These realtionships will determine whether the cell will turn on or off in the next
step.

For example: If our rule set is 1:On, 2:Off
             Any cell with exactly 1 neighbor that is on will turn on in the next step.
             Any cell with exactly 2 neighbors that are on will turn off in the next step.
             
These networks are interesting because they can be used to simulate some biological processes. 
Among the biological processes these simulations can be used to better understand are the color changing
skin of some cephalopods, and  way plants intake, and lose, gases.
