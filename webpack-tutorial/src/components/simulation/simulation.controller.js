angular.module('iscAiApp').controller('SimulationCtrl', SimulationCtrl);

SimulationCtrl.$inject = [
  '$scope'
];

function SimulationCtrl($scope) {
	var me = this;
	me.name = "Simulation"
}