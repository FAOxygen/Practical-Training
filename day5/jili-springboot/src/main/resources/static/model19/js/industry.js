$(function() {
    var dom = document.getElementById("container3");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    // var pathSymbols = {
    //     reindeer: 'path://M-22.788,24.521c2.08-0.986,3.611-3.905,4.984-5.892 c-2.686,2.782-5.047,5.884-9.102,7.312c-0.992,0.005-0.25-2.016,0.34-2.362l1.852-0.41c0.564-0.218,0.785-0.842,0.902-1.347 c2.133-0.727,4.91-4.129,6.031-6.194c1.748-0.7,4.443-0.679,5.734-2.293c1.176-1.468,0.393-3.992,1.215-6.557 c0.24-0.754,0.574-1.581,1.008-2.293c-0.611,0.011-1.348-0.061-1.959-0.608c-1.391-1.245-0.785-2.086-1.297-3.313 c1.684,0.744,2.5,2.584,4.426,2.586C-8.46,3.012-8.255,2.901-8.04,2.824c6.031-1.952,15.182-0.165,19.498-3.937 c1.15-3.933-1.24-9.846-1.229-9.938c0.008-0.062-1.314-0.004-1.803-0.258c-1.119-0.771-6.531-3.75-0.17-3.33 c0.314-0.045,0.943,0.259,1.439,0.435c-0.289-1.694-0.92-0.144-3.311-1.946c0,0-1.1-0.855-1.764-1.98 c-0.836-1.09-2.01-2.825-2.992-4.031c-1.523-2.476,1.367,0.709,1.816,1.108c1.768,1.704,1.844,3.281,3.232,3.983 c0.195,0.203,1.453,0.164,0.926-0.468c-0.525-0.632-1.367-1.278-1.775-2.341c-0.293-0.703-1.311-2.326-1.566-2.711 c-0.256-0.384-0.959-1.718-1.67-2.351c-1.047-1.187-0.268-0.902,0.521-0.07c0.789,0.834,1.537,1.821,1.672,2.023 c0.135,0.203,1.584,2.521,1.725,2.387c0.102-0.259-0.035-0.428-0.158-0.852c-0.125-0.423-0.912-2.032-0.961-2.083 c-0.357-0.852-0.566-1.908-0.598-3.333c0.4-2.375,0.648-2.486,0.549-0.705c0.014,1.143,0.031,2.215,0.602,3.247 c0.807,1.496,1.764,4.064,1.836,4.474c0.561,3.176,2.904,1.749,2.281-0.126c-0.068-0.446-0.109-2.014-0.287-2.862 c-0.18-0.849-0.219-1.688-0.113-3.056c0.066-1.389,0.232-2.055,0.277-2.299c0.285-1.023,0.4-1.088,0.408,0.135 c-0.059,0.399-0.131,1.687-0.125,2.655c0.064,0.642-0.043,1.768,0.172,2.486c0.654,1.928-0.027,3.496,1,3.514 c1.805-0.424,2.428-1.218,2.428-2.346c-0.086-0.704-0.121-0.843-0.031-1.193c0.221-0.568,0.359-0.67,0.312-0.076 c-0.055,0.287,0.031,0.533,0.082,0.794c0.264,1.197,0.912,0.114,1.283-0.782c0.15-0.238,0.539-2.154,0.545-2.522 c-0.023-0.617,0.285-0.645,0.309,0.01c0.064,0.422-0.248,2.646-0.205,2.334c-0.338,1.24-1.105,3.402-3.379,4.712 c-0.389,0.12-1.186,1.286-3.328,2.178c0,0,1.729,0.321,3.156,0.246c1.102-0.19,3.707-0.027,4.654,0.269 c1.752,0.494,1.531-0.053,4.084,0.164c2.26-0.4,2.154,2.391-1.496,3.68c-2.549,1.405-3.107,1.475-2.293,2.984 c3.484,7.906,2.865,13.183,2.193,16.466c2.41,0.271,5.732-0.62,7.301,0.725c0.506,0.333,0.648,1.866-0.457,2.86 c-4.105,2.745-9.283,7.022-13.904,7.662c-0.977-0.194,0.156-2.025,0.803-2.247l1.898-0.03c0.596-0.101,0.936-0.669,1.152-1.139 c3.16-0.404,5.045-3.775,8.246-4.818c-4.035-0.718-9.588,3.981-12.162,1.051c-5.043,1.423-11.449,1.84-15.895,1.111 c-3.105,2.687-7.934,4.021-12.115,5.866c-3.271,3.511-5.188,8.086-9.967,10.414c-0.986,0.119-0.48-1.974,0.066-2.385l1.795-0.618 C-22.995,25.682-22.849,25.035-22.788,24.521z',
    //     huanbao: 'path://"M769.143467 622.865067h-149.486934v-58.248534l-76.202666 135.7824L619.656533 836.266667v-57.9584h76.202667a52.599467 52.599467 0 0 0 46.045867-26.914134L836.266667 583.5776c-13.943467 24.32-39.560533 39.594667-67.1232 39.3216v-0.034133zM662.135467 389.12l76.526933-135.7824-48.964267 29.269333s-19.131733-34.304-26.914133-47.957333c-10.7008-18.961067-30.805333-31.2832-52.206933-30.958933-21.4016 0-41.506133 11.997867-52.206934 31.2832 0 0-17.5104 30.976-35.0208 62.583466l35.669334 63.2832-49.288534 28.603734 152.405334-0.324267z m-294.434134 154.88l-74.9056 132.829867a80.896 80.896 0 0 0-0.324266 79.5648l-94.3616-167.850667a55.534933 55.534933 0 0 1 0.324266-54.596267l38.263467-67.566933L187.733333 437.418667h152.7296l76.202667 135.8336-48.964267-29.2352z m333.021867 62.583467l-76.202667-135.816534 131.003734-77.585066c29.832533 53.589333 67.771733 120.832 67.771733 120.832a62.9248 62.9248 0 0 1 0.324267 61.934933 60.398933 60.398933 0 0 1-52.5312 30.634667h-70.365867zM305.7664 687.104s17.5104-30.958933 35.345067-62.907733h152.7296v155.477333h-135.867734a58.9312 58.9312 0 0 1-52.5312-30.634667 62.907733 62.907733 0 0 1 0.324267-61.934933z m239.3088-460.049067c-17.834667 31.607467-116.736 207.36-116.411733 207.36l-131.652267-77.892266s62.907733-113.493333 79.445333-141.141334c9.403733-16.3328 25.941333-27.648 45.7216-27.648h188.7232c-27.562667 0-51.882667 14.626133-65.826133 39.3216z',
    //     rocket: 'path://M-244.396,44.399c0,0,0.47-2.931-2.427-6.512c2.819-8.221,3.21-15.709,3.21-15.709s5.795,1.383,5.795,7.325C-237.818,39.679-244.396,44.399-244.396,44.399z M-260.371,40.827c0,0-3.881-12.946-3.881-18.319c0-2.416,0.262-4.566,0.669-6.517h17.684c0.411,1.952,0.675,4.104,0.675,6.519c0,5.291-3.87,18.317-3.87,18.317H-260.371z M-254.745,18.951c-1.99,0-3.603,1.676-3.603,3.744c0,2.068,1.612,3.744,3.603,3.744c1.988,0,3.602-1.676,3.602-3.744S-252.757,18.951-254.745,18.951z M-255.521,2.228v-5.098h1.402v4.969c1.603,1.213,5.941,5.069,7.901,12.5h-17.05C-261.373,7.373-257.245,3.558-255.521,2.228zM-265.07,44.399c0,0-6.577-4.721-6.577-14.896c0-5.942,5.794-7.325,5.794-7.325s0.393,7.488,3.211,15.708C-265.539,41.469-265.07,44.399-265.07,44.399z M-252.36,45.15l-1.176-1.22L-254.789,48l-1.487-4.069l-1.019,2.116l-1.488-3.826h8.067L-252.36,45.15z',
    //     gongnuan: 'path://M904.625704 503.021511l0-28.310789c0-41.160445-33.483602-74.698283-74.697259-74.698283L752.072239 400.01244c-41.213657 0-74.698283 33.537837-74.698283 74.698283l0 13.393032-51.504024 0 0-13.393032c0-41.160445-33.483602-74.698283-74.698283-74.698283l-77.855182 0c-41.21468 0-74.698283 33.537837-74.698283 74.698283l0 13.393032-51.559283 0 0-13.393032c0-41.160445-33.483602-74.698283-74.698283-74.698283l-77.855182 0c-41.213657 0-74.698283 33.537837-74.698283 74.698283l0 27.874861c-20.797675 14.591323-34.462906 38.546921-34.462906 65.768913l0 52.484352c0 27.223015 13.665231 51.287083 34.462906 65.768913l0 195.891506c0 41.160445 33.484625 74.644047 74.698283 74.644047l77.855182 0c41.21468 0 74.698283-33.484625 74.698283-74.644047L347.058902 701.090613l51.559283 0 0 181.408653c0 41.160445 33.483602 74.644047 74.698283 74.644047l77.855182 0c41.21468 0 74.698283-33.484625 74.698283-74.644047L625.869932 701.090613l51.504024 0 0 181.408653c0 41.160445 33.484625 74.644047 74.698283 74.644047l77.856205 0c41.213657 0 74.697259-33.484625 74.697259-74.644047L904.625704 686.282349c20.526499-14.591323 34.028001-38.438451 34.028001-65.442478l0-52.484352C938.653705 541.350468 925.152203 517.503341 904.625704 503.021511zM291.308157 882.500289c0 10.236132-8.65717 18.892279-18.947538 18.892279l-77.855182 0c-10.290367 0-18.947538-8.656147-18.947538-18.892279L175.5579 474.710722c0-10.290367 8.65717-18.947538 18.947538-18.947538l77.855182 0c10.290367 0 18.947538 8.65717 18.947538 18.947538L291.308157 882.500289zM347.058902 645.339868l0-101.485369 51.559283 0 0 101.485369L347.058902 645.339868zM570.119187 882.500289c0 10.236132-8.65717 18.892279-18.947538 18.892279l-77.855182 0c-10.290367 0-18.947538-8.656147-18.947538-18.892279L454.36893 474.710722c0-10.290367 8.65717-18.947538 18.947538-18.947538l77.855182 0c10.290367 0 18.947538 8.65717 18.947538 18.947538L570.119187 882.500289zM625.869932 645.339868l0-101.485369 51.504024 0 0 101.485369L625.869932 645.339868zM848.874959 882.500289c0 10.236132-8.656147 18.892279-18.946514 18.892279L752.072239 901.392568c-10.290367 0-18.946514-8.656147-18.946514-18.892279L733.125725 474.710722c0-10.290367 8.656147-18.947538 18.946514-18.947538l77.856205 0c10.290367 0 18.946514 8.65717 18.946514 18.947538L848.874959 882.500289zM770.52859 373.497553c6.588045 0 13.230326-2.341325 18.511609-7.023974 11.541871-10.235109 12.522198-27.874861 2.341325-39.417755-17.695011-19.817348-25.53456-38.002522-23.411199-53.954843 2.939959-22.050202 24.391527-36.20662 28.692482-39.581484 34.898835-32.667004 49.652863-65.334008 43.88244-97.130178-8.221242-45.025473-54.118572-65.22349-59.344596-67.402109-14.210653-5.879917-30.271444 0.817622-36.260855 14.917758-5.934153 14.156418 0.707105 30.435173 14.754029 36.477796 5.990434 2.613524 23.737634 13.012362 26.025747 26.133194 2.013867 11.597129-7.622608 28.03859-22.867824 43.065841-4.409426 2.777253-43.282782 28.256554-50.034557 75.241658-4.736884 33.048697 7.676843 66.477041 36.859489 99.362009C755.230162 370.340653 762.85277 373.497553 770.52859 373.497553zM513.82302 373.497553c6.588045 0 13.230326-2.341325 18.511609-7.023974 11.541871-10.235109 12.521175-27.874861 2.340301-39.417755-17.693987-19.817348-25.533536-38.002522-23.411199-53.954843 2.939959-22.050202 24.391527-36.20662 28.692482-39.581484 34.898835-32.667004 49.652863-65.334008 43.88244-97.130178-8.221242-45.025473-54.117548-65.22349-59.344596-67.402109-14.100136-5.879917-30.216185 0.817622-36.259832 14.917758-5.935176 14.156418 0.707105 30.435173 14.754029 36.477796 5.989411 2.613524 23.737634 13.012362 26.024723 26.133194 2.01489 11.597129-7.621585 28.03859-22.8668 43.065841-4.41045 2.777253-43.283806 28.256554-50.034557 75.241658-4.736884 33.048697 7.67582 66.477041 36.859489 99.362009C498.524592 370.340653 506.146177 373.497553 513.82302 373.497553zM248.350786 373.497553c6.588045 0 13.230326-2.341325 18.511609-7.023974 11.541871-10.235109 12.521175-27.874861 2.340301-39.417755-17.693987-19.817348-25.533536-38.002522-23.411199-53.954843 2.939959-22.050202 24.391527-36.20662 28.692482-39.581484 34.898835-32.667004 49.652863-65.334008 43.88244-97.130178-8.220219-45.025473-54.117548-65.22349-59.344596-67.402109-14.100136-5.879917-30.270421 0.817622-36.259832 14.917758-5.935176 14.156418 0.707105 30.435173 14.754029 36.477796 5.989411 2.613524 23.737634 13.012362 26.024723 26.133194 2.01489 11.597129-7.621585 28.03859-22.8668 43.065841-4.41045 2.777253-43.283806 28.256554-50.034557 75.241658-4.736884 33.048697 7.676843 66.477041 36.859489 99.362009C233.052359 370.340653 240.673943 373.497553 248.350786 373.497553z',
    //     caijue: 'path://M509.43406 679.723979l328.591807 0c24.785499 0 47.437405 10.239202 63.686485 26.455535 0.427742 0.461511 0.851391 0.461511 0.851391 0.889253 15.82543 16.214287 25.604144 38.47222 25.604144 62.369489 0 24.783453-10.243295 47.433312-26.456558 63.682391-0.427742 0.424672-0.853437 0.817622-1.316995 1.281179-16.213263 15.360849-38.010709 25.175379-62.369489 25.175379L509.43406 859.577207c-24.74866 0-47.399543-10.241248-63.650669-26.456558l13.726629-13.725606-13.726629 13.725606c-0.425695-0.463558-0.852414-0.88823-0.852414-1.280156-15.788591-16.251126-25.637913-38.047548-25.637913-62.402235 0-24.749684 10.276041-47.009663 26.490328-63.258743C462.034517 689.963181 484.685399 679.723979 509.43406 679.723979L509.43406 679.723979zM887.596865 658.744155c-131.138736 0-264.057001 2.169409-395.265322 0-6.365988 0-12.374842-2.952238-16.21531-8.498558L362.47194 476.333686c-13.654998-21.370727-22.651906-34.206056-27.770484-36.767392-1.280156-0.817622-0.427742 3.450589-5.15644 9.422603-16.642029 20.091594-32.466436 39.718607-47.827285 59.347666-6.827499 8.603959-13.652951 17.137309-22.649859 28.693506-1.279133 1.671059-3.022847 3.411703-5.120624 5.082762-8.534374 6.009877-20.517289 4.303003-26.527167-4.26514l0 0c-13.19144-18.345834-20.872377-31.182186-28.16241-44.020586-4.693906-8.071839-8.960069-15.787568-14.968923-24.747637-5.120624-7.291057-4.693906-17.104563 0.88823-23.932062l0 0 99.136881-114.951055c17.921161-20.925588 34.597983-32.482809 52.127218-33.761941 19.202341-1.672082 36.305881 8.53335 53.408397 31.185256 14.935154 20.517289 37.124526 50.847062 58.919924 81.606623 14.508435 20.088524 28.66076 40.153512 41.462321 57.68377 5.582135-9.813506 11.095709-19.663852 17.10354-29.868261 27.76946-49.16884 60.660568-106.434078 85.907579-147.008168 2.952238-6.399757 9.351995-10.70276 17.033955-10.70276 31.221072 0 42.739407 0 56.43022 0 44.022633-0.425695 92.699262-0.817622 129.040958 0l0.853437 0c10.66899 0 19.664875 8.144494 19.664875 18.827811l0 0c0.851391 24.76708 0.425695 49.978275 0 75.206866 0 18.34788-0.461511 36.748972 0 54.68753l71.329559 0c35.488259 0 56.821123 31.211862 65.355497 70.931492 2.596128 13.652951 4.303003 28.198226 4.303003 43.128263 0 14.97097-1.706875 29.9051-4.730745 43.63173C944.026062 626.706485 922.22964 658.744155 887.596865 658.744155L887.596865 658.744155zM67.230706 663.4749c-15.787568-75.597769 25.638937-131.60127 79.899748-178.607864 0.853437-0.852414 1.706875-1.705851 2.596128-2.131547 8.9263-5.975085 20.872377-3.378957 26.456558 5.582135l51.665707 79.041194c2.169409 2.527566 3.056616 5.548366 3.449565 8.499581l-18.811438 3.022847 18.811438-3.022847c5.973038 39.789215 19.23611 66.243727 40.572044 84.201727 22.223141 18.810415 54.29765 29.904077 95.723132 38.864146 4.301979 0.856507 8.568143 2.987031 11.555174 6.828522 6.40078 8.141424 5.120624 20.554128-2.987031 26.91807l-11.982916-14.898315 11.982916 14.898315c-77.765131 62.865793-158.980851 67.098187-219.180931 39.788192-22.685675-10.701736-42.776246-25.672706-57.710376-44.447305C83.444992 709.629079 72.316537 687.403892 67.230706 663.4749L67.230706 663.4749zM735.939817 456.669834 602.170161 456.669834l-0.38988 0c-3.025916 0-6.437619-0.853437-9.425673-2.560312-9.42158-5.120624-12.373819-16.642029-7.251148-26.056446l0 0 46.544059-82.461083c2.986007-6.843872 9.851369-11.57257 17.532305-11.57257l86.758969 0c10.66899 0 19.203364 8.996908 19.203364 19.23611l0 84.210937C755.142158 448.136483 746.607784 456.669834 735.939817 456.669834L735.939817 456.669834zM838.025866 718.16243 509.43406 718.16243c-14.045901 0-26.883277 5.547343-36.305881 14.969946-9.422603 9.423627-15.360849 22.225187-15.360849 36.305881 0 13.651928 5.51255 26.491351 14.507412 35.449373 0 0.464581 0.427742 0.889253 0.853437 0.889253l0 0 0 0c8.997931 9.386788 22.25998 15.359826 36.305881 15.359826l328.591807 0c13.690814 0 26.492374-5.54632 35.488259-14.507412l0.855484-0.852414c9.385764-8.959046 15.395642-22.224164 15.395642-36.338626 0-13.656021-5.582135-26.064632-14.57802-35.453467l-0.817622-0.852414C864.948029 723.709773 852.144422 718.16243 838.025866 718.16243L838.025866 718.16243zM815.805796 737.400586c17.564028 0 32.072463 14.541181 32.072463 32.038694 0 17.920138-14.508435 32.03767-32.072463 32.03767-17.958 0-32.04074-14.117532-32.04074-32.03767C783.765055 751.941767 797.847795 737.400586 815.805796 737.400586L815.805796 737.400586zM720.934055 737.400586c17.993816 0 32.074509 14.541181 32.074509 32.038694 0 17.920138-14.080693 32.03767-32.074509 32.03767-17.458627 0-32.036647-14.117532-32.036647-32.03767C688.897408 751.941767 703.475428 737.400586 720.934055 737.400586L720.934055 737.400586zM626.525871 737.400586c17.530258 0 32.074509 14.541181 32.074509 32.038694 0 17.920138-14.544251 32.03767-32.074509 32.03767-17.920138 0-32.036647-14.117532-32.036647-32.03767C594.489224 751.941767 608.605733 737.400586 626.525871 737.400586L626.525871 737.400586zM531.694039 737.400586c17.922185 0 32.038694 14.541181 32.038694 32.038694 0 17.920138-14.116509 32.03767-32.038694 32.03767-17.531282 0-32.038694-14.117532-32.038694-32.03767C499.655346 751.941767 514.162758 737.400586 531.694039 737.400586L531.694039 737.400586z',
    //     nongye: 'path://M225.792 1024h-2.56c-17.408-1.536-30.72-16.384-29.696-34.304 0.512-4.096 8.192-107.008 65.024-249.344 52.224-130.56 157.696-321.024 362.496-485.376 13.824-11.264 33.792-8.704 45.056 5.12 11.264 13.824 8.704 33.792-5.12 45.056-371.2 297.472-403.456 685.568-403.968 689.152-0.512 16.896-14.848 29.696-31.232 29.696zM688.128 318.976c-30.72 0-56.832-9.728-72.704-32.256-11.776-16.896-25.6-53.76 12.288-114.176 23.04-36.864 60.928-74.24 105.984-105.472C778.752 35.84 827.392 13.312 869.376 4.608c69.632-14.848 99.84 11.264 111.104 28.16 42.496 60.928-27.648 156.672-118.272 219.648-56.32 39.424-122.368 66.56-174.08 66.56z m219.648-254.976c-6.656 0-14.848 1.024-25.088 3.072-33.792 7.168-74.752 26.112-112.64 52.736-37.888 26.112-70.144 57.856-88.064 87.04-15.872 25.088-16.384 39.936-13.824 43.52 7.168 10.24 72.704 8.704 158.208-50.688s109.568-120.32 102.4-130.56c-2.048-2.56-8.192-5.12-20.992-5.12zM697.856 610.816c-19.968 0-40.448-1.536-60.928-4.096-54.784-7.168-105.472-23.552-142.336-45.568-61.44-36.352-66.048-75.776-63.488-95.744 2.56-20.48 17.408-56.832 86.016-75.776 41.984-11.264 94.72-13.824 149.504-6.656 109.568 14.336 215.552 67.584 205.824 141.312-7.68 59.904-86.016 86.528-174.592 86.528z m-92.16-167.936c-26.624 0-51.2 3.072-71.168 8.192-28.672 7.68-38.912 18.944-39.424 22.528-0.512 4.096 6.656 16.896 32.256 32.256 29.696 17.408 72.704 31.232 118.272 36.864 103.424 13.824 161.792-14.848 163.84-27.648 1.536-12.288-47.616-55.808-151.04-69.12-17.92-2.048-35.84-3.072-52.736-3.072z m235.52 77.312zM580.608 880.128c-31.744 0-65.024-4.096-97.792-11.776-53.76-12.288-102.4-33.28-137.728-58.368-57.856-41.984-58.368-81.408-53.76-101.376 4.608-19.968 22.528-55.296 92.672-67.584 42.496-7.68 95.744-5.12 149.504 7.68 108.032 24.576 208.384 87.552 191.488 159.744-11.264 50.688-72.192 71.68-144.384 71.68z m-145.408-179.2c-14.336 0-28.16 1.024-39.936 3.072-29.184 5.12-40.96 14.848-41.472 18.944-1.024 4.096 5.12 17.408 29.184 35.328 27.648 19.968 69.632 37.888 114.176 48.128 101.376 23.552 162.816 0 165.376-11.776 2.56-12.288-41.984-59.904-143.36-82.944-28.672-7.168-57.856-10.752-83.968-10.752z m258.56 100.352zM445.952 475.648c-21.504 0-56.832-10.24-87.04-68.096-19.968-38.4-33.28-89.6-37.888-144.896-4.608-54.784 0.512-108.032 14.336-148.992C357.376 46.08 394.752 33.28 415.232 31.744c20.48-1.536 59.392 5.12 92.16 68.096 19.968 38.4 33.28 89.6 37.888 144.896 8.704 110.08-20.992 224.768-94.72 230.912h-4.608z m-25.088-379.904s-0.512 0 0 0c-4.096 0.512-15.36 10.24-25.088 38.4-10.752 32.768-14.848 77.824-11.264 123.392 3.584 46.08 14.848 89.6 30.72 120.32 13.824 26.624 26.624 34.304 30.72 33.792 12.288-1.024 44.544-58.368 35.84-161.792-3.584-46.08-14.848-89.6-30.72-120.32-13.824-26.112-26.112-33.792-30.208-33.792zM298.496 687.616c-55.808 0-127.488-48.64-181.76-111.104-36.352-41.472-63.488-87.04-76.8-128-22.016-67.584 0.512-100.352 15.872-113.664 55.808-48.64 158.72 10.24 231.424 93.696C359.936 512 404.48 622.08 348.672 670.72c-14.848 11.264-31.744 16.896-50.176 16.896z m28.672-41.984zM104.96 380.416c-3.584 0-6.144 0.512-7.68 2.048-3.072 2.56-6.144 17.408 3.072 45.568 10.752 32.768 34.304 71.168 64.512 105.984 68.608 78.336 131.584 95.744 140.8 87.552 9.216-8.192 1.024-73.216-67.584-151.552-57.856-67.072-112.64-89.6-133.12-89.6z',
    //     dianchang: 'path://M921.2 495.4l-320-137.1c-8.4-3.6-16.9-5.2-25.2-5.2V96c0-18.5-15.2-32-32-32-4.7 0-9.6 1.1-14.3 3.4L99.4 302.3c-21.7 10.8-35.4 33-35.4 57.2V896c0 35.3 28.7 64 64 64h768c35.3 0 64-28.7 64-64V554.2c0-25.6-15.3-48.7-38.8-58.8zM352 896v-96c0-17.7-14.3-32-32-32s-32 14.3-32 32v96H128V359.6L512 150v746H352z m544 0H768v-32c0-17.7-14.3-32-32-32s-32 14.3-32 32v32H576l0.2-478.9L896 554.2V896z" p-id="937"></path><path d="M320 416m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" p-id="938"></path><path d="M320 544m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0ZM320 672m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0ZM736 608m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0ZM736 736m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z',
    //     guolu: 'path://M580.208986 276.950659c37.409005 53.553707 53.656037 223.713154-8.901741 58.421574C517.873266 194.182584 541.206694 138.967028 541.206694 138.967028c-55.697533 42.271756-48.276517 140.896984-35.808554 172.054611 12.473079 31.178093-34.728966-52.560076-100.635001-47.717791 74.810846 102.265128 55.650461 211.32501 24.928762 211.32501-15.141862 0-34.70543-6.818289-49.635467-48.251957-5.222955 12.922311-15.423271 33.945113-12.71151 87.197968 3.705392 71.956845 39.682791 128.97956 95.045703 151.420665 14.976086 6.073322 31.378661 9.587356 48.942689 10.211573 30.264281-4.687766 49.112558-8.894577 89.208764-16.051581 17.643845-6.962575 29.730115-20.964474 33.499975-25.039279C719.522915 540.614711 636.811122 318.196039 580.208986 276.950659zM533.751908 793.104259c-1.214664 0-2.428306-0.010233-3.645017-0.031722-41.398876-0.706081-81.21879-13.30605-115.152647-36.433794-35.785018-24.387433-62.799278-59.289338-78.121242-100.933807l-1.412163-3.839445 8.640798-3.184529 1.414209 3.844561c28.830629 78.359672 101.365642 129.913838 184.789657 131.340327 1.243317 0.021489 2.496867 0.031722 3.731998 0.031722 85.079724 0 156.778696-51.330062 191.797257-137.309272l1.543146-3.790326 8.529257 3.473101-1.544169 3.791349c-18.99768 46.65253-49.042973 84.425831-86.884836 109.23589C613.705891 781.414009 574.39456 793.104259 533.751908 793.104259z',
    // };

    option = {
        xAxis: {
            type: 'category',
            data: ['Model Y', '哈弗H6', '宋PLUS 新能源', 'AION Y', '锋兰达', '元PLUS']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [31054,14793,22079,19306,14509, 26072,],
                type: 'bar'
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
});